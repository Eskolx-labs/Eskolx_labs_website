'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'

/*
 * The living field: a fixed canvas of drifting fibers that answers the
 * scroll — Lenis velocity blows them across the page and shear streaks
 * them; at rest they wander like dust in library light. Ink tone tracks
 * the active field so the fibers read on both spreads. Desktop,
 * motion-permitting only; the page never pays for it otherwise.
 *
 * The draft is smoothed, not instant: an asymmetric exponential chase
 * (fast attack ~10/s, slow decay ~3/s) so the surge is tied to the
 * finger but the tail lingers after you stop — the page breathes. Each
 * fiber carries its own drag, so light motes surge first and heavy
 * ones lag: the field shears into a gradient of lag instead of moving
 * as one rigid sheet. Streaks are stroked lines aligned with each
 * mote's actual velocity, with a slow per-particle tumble — no
 * save/restore, no transform state churn.
 */

type Fiber = {
  x: number
  y: number
  s: number
  vy: number
  vx: number
  phase: number
  alpha: number
  drag: number
  rot: number
  vrot: number
}

const COUNT = 110

// live media query as external store: SSR snapshot is false, the client
// flips after hydration, and a mid-session change (preference toggle,
// crossing the breakpoint) retires the canvas without a reload
function useMatches(query: string) {
  const subscribe = (onChange: () => void) => {
    const mq = window.matchMedia(query)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export function LivingGrain() {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = useMatches('(prefers-reduced-motion: reduce)')
  const small = useMatches('(max-width: 767px)')
  const retired = reduced || small

  useEffect(() => {
    if (retired) return
    const canvas = ref.current
    const ctx2d = canvas?.getContext('2d')
    if (!canvas || !ctx2d) return

    let w = 0
    let h = 0
    let raf = 0
    let running = true
    let lastDraw = 0
    const fibers: Fiber[] = []
    // night frames cost the same and read dimmer; drift slower there
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const FRAME_MIN = 33
    const FRAME_MIN_NIGHT = 50

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0)
      for (const f of fibers) {
        f.x = Math.random() * w
        f.y = Math.random() * h
      }
    }

    for (let i = 0; i < COUNT; i++) {
      fibers.push({
        x: 0,
        y: 0,
        s: 0.6 + Math.random() * 1.3,
        vy: -(0.06 + Math.random() * 0.2),
        vx: (Math.random() - 0.5) * 0.05,
        phase: Math.random() * Math.PI * 2,
        // visible but quiet: the old 0.04-0.12 range rendered at 4-12%
        // opacity — technically present, imperceptible on both fields.
        // 0.10-0.24 reads as dust in library light without shouting.
        alpha: 0.1 + Math.random() * 0.14,
        // per-particle drag: light motes surge first, heavy ones lag —
        // the field shears into a gradient of lag instead of moving as
        // one rigid sheet
        drag: 3 + Math.random() * 7,
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.02,
      })
    }
    resize()
    window.addEventListener('resize', resize)

    // track the field's ink color so fibers tint with the spread. The old
    // sampler polled getComputedStyle every 500ms — a forced style recalc
    // on every scroll frame, the page's worst longtask source. The field
    // controller writes the vars to body.style itself, so a MutationObserver
    // fires exactly when the field changes (throttled to ~25/s by the
    // controller) and never during settled scroll.
    let inkRGB: [number, number, number] = [41, 25, 12]
    const sampleInk = () => {
      const v = getComputedStyle(document.body).getPropertyValue('--field-ink').trim()
      if (!v) return
      const m = v.match(/(\d+),\s*(\d+),\s*(\d+)/)
      if (m) {
        inkRGB = [+m[1], +m[2], +m[3]]
        const lum =
          (0.2126 * inkRGB[0] + 0.7152 * inkRGB[1] + 0.0722 * inkRGB[2]) / 255
        frameMin = lum < 0.35 ? FRAME_MIN_NIGHT : FRAME_MIN
      }
    }
    const inkObserver = new MutationObserver(sampleInk)
    inkObserver.observe(document.body, { attributes: true, attributeFilter: ['style'] })
    sampleInk()

    let frameMin = FRAME_MIN
    // the smoothed draft: chases the raw Lenis velocity with an
    // asymmetric exponential — fast attack (the surge is tied to the
    // finger), slow decay (the tail lingers after you stop). Frame-rate
    // independent via the exp(-lambda*dt) form.
    let draft = 0
    const tick = () => {
      if (!running) return
      raf = requestAnimationFrame(tick)
      const t = performance.now()
      if (t - lastDraw < frameMin) return
      const dt = Math.min((t - lastDraw) / 1000, 0.1)
      lastDraw = t
      const lenis = (window as unknown as { __lenis?: { velocity: number } }).__lenis
      const vel = lenis ? lenis.velocity : 0
      const target = Math.max(-14, Math.min(14, vel * 0.55))
      const lambda = Math.abs(target) > Math.abs(draft) ? 10 : 3
      draft += (target - draft) * (1 - Math.exp(-lambda * dt))
      if (Math.abs(draft) < 0.5) draft = 0
      ctx2d.clearRect(0, 0, w, h)
      ctx2d.fillStyle = `rgb(${inkRGB[0]}, ${inkRGB[1]}, ${inkRGB[2]})`
      ctx2d.lineCap = 'round'
      for (const f of fibers) {
        f.phase += 0.008
        f.rot += f.vrot
        // per-particle response: the draft pulls each mote by its own
        // drag, so light motes surge first and heavy ones lag
        const pull = draft * (1 - Math.exp(-f.drag * dt))
        f.x += f.vx + Math.sin(f.phase) * 0.18 + pull * 0.045
        f.y += f.vy + pull * 0.22
        if (f.y < -4) f.y = h + 4
        if (f.y > h + 4) f.y = -4
        if (f.x < -4) f.x = w + 4
        if (f.x > w + 4) f.x = -4
        // the streak: a stroked line aligned with the mote's actual
        // velocity plus its slow tumble — no save/restore, no transform
        // state churn
        const ang = Math.atan2(f.vy + pull * 0.22, f.vx + Math.sin(f.phase) * 0.18 + pull * 0.045) + f.rot
        const len = f.s * (1 + Math.min(Math.abs(draft) * 0.16, 2.6))
        ctx2d.globalAlpha = f.alpha
        ctx2d.beginPath()
        ctx2d.moveTo(f.x - Math.cos(ang) * len * 0.5, f.y - Math.sin(ang) * len * 0.5)
        ctx2d.lineTo(f.x + Math.cos(ang) * len * 0.5, f.y + Math.sin(ang) * len * 0.5)
        ctx2d.stroke()
      }
      ctx2d.globalAlpha = 1
      ctx2d.fillStyle = `rgb(${inkRGB[0]}, ${inkRGB[1]}, ${inkRGB[2]})`
    }
    raf = requestAnimationFrame(tick)

    const onVis = () => {
      running = document.visibilityState === 'visible'
      if (running) raf = requestAnimationFrame(tick)
      else cancelAnimationFrame(raf)
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      inkObserver.disconnect()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [retired])

  if (retired) return null
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45]"
    />
  )
}
