'use client'

import { useEffect, useRef, useState } from 'react'

/*
 * The living field: a fixed canvas of drifting fibers that answers the
 * scroll — Lenis velocity blows them across the page and shear streaks
 * them; at rest they wander like dust in library light. Ink tone tracks
 * the active field so the fibers read on both spreads. Desktop,
 * motion-permitting only; the page never pays for it otherwise.
 */

type Fiber = {
  x: number
  y: number
  s: number
  vy: number
  vx: number
  phase: number
  alpha: number
}

const COUNT = 110

export function LivingGrain() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [retire, setRetire] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 767px)').matches
    if (reduced || small) {
      setRetire(true)
      return
    }
    const canvas = ref.current
    const ctx2d = canvas?.getContext('2d')
    if (!canvas || !ctx2d) return

    let w = 0
    let h = 0
    let raf = 0
    let running = true
    let inkCache = ''
    let inkAt = 0
    const fibers: Fiber[] = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

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
        alpha: 0.04 + Math.random() * 0.08,
      })
    }
    resize()
    window.addEventListener('resize', resize)

    // track the field's ink color so fibers tint with the spread
    let inkRGB: [number, number, number] = [41, 25, 12]
    const sampleInk = (t: number) => {
      if (t - inkAt < 500 && inkCache) return
      inkAt = t
      const v = getComputedStyle(document.body).getPropertyValue('--field-ink').trim()
      if (!v || v === inkCache) return
      inkCache = v
      const m = v.match(/(\d+),\s*(\d+),\s*(\d+)/)
      if (m) inkRGB = [+m[1], +m[2], +m[3]]
    }

    const tick = () => {
      if (!running) return
      const t = performance.now()
      sampleInk(t)
      const lenis = (window as unknown as { __lenis?: { velocity: number } }).__lenis
      const vel = lenis ? lenis.velocity : 0
      const boost = Math.max(-14, Math.min(14, vel * 0.55))
      ctx2d.clearRect(0, 0, w, h)
      for (const f of fibers) {
        f.phase += 0.008
        f.x += f.vx + Math.sin(f.phase) * 0.18 + boost * 0.045
        f.y += f.vy + boost * 0.22
        if (f.y < -4) f.y = h + 4
        if (f.y > h + 4) f.y = -4
        if (f.x < -4) f.x = w + 4
        if (f.x > w + 4) f.x = -4
        const stretch = 1 + Math.min(Math.abs(boost) * 0.16, 2.6)
        ctx2d.fillStyle = `rgba(${inkRGB[0]}, ${inkRGB[1]}, ${inkRGB[2]}, ${f.alpha})`
        ctx2d.fillRect(f.x, f.y, f.s * stretch, f.s)
      }
      raf = requestAnimationFrame(tick)
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
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  if (retire) return null
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45]"
    />
  )
}
