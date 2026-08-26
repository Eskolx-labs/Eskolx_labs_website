'use client'

import type ScrollTrigger from 'gsap/ScrollTrigger'

/*
 * Measured plate-stack grammar, shared by the trellis and the joining-bar
 * rooms. The old code declared stake positions as exact thirds and lit
 * them on a leftover five-beat grid — assumptions that silently broke the
 * moment plates grew unequal content or the window reserve bound. Every
 * consumer (jump buttons, lighting thresholds, aria-current) now derives
 * from one measurement: plate i takes the window when the stack's
 * translate reaches -offsetTop(i), i.e. at progress offsetTop(i)/travel.
 */

export function plateFractions(stack: HTMLElement, frame: HTMLElement): number[] {
  const travel = Math.max(stack.scrollHeight - frame.clientHeight, 1)
  return Array.from(stack.children).map(
    (c) => Math.min((c as HTMLElement).offsetTop / travel, 1),
  )
}

/** scroll progress through a pinned room, 0..1; -1 when the room is not
    pinned (collapsed to flow by a media guard) so callers can fall back */
export function roomProgress(rootId: string): number {
  const el = document.getElementById(rootId)
  const pin = el?.querySelector<HTMLElement>('[data-pin]')
  if (!el || !pin) return -1
  const room = pin.offsetHeight - window.innerHeight
  if (room <= 0) return -1
  return Math.min(Math.max(-el.getBoundingClientRect().top / room, 0), 1)
}

/** jump target for plate i of a pinned room, in absolute page pixels,
    honoring Lenis when present */
export function scrollToPlate(rootId: string, stackSel: string, index: number, count: number) {
  const el = document.getElementById(rootId)
  const stack = document.querySelector<HTMLElement>(stackSel)
  const frame = stack?.parentElement as HTMLElement | null
  if (!el || !stack || !frame) return
  const fractions = plateFractions(stack, frame)
  const fallback = count > 1 ? index / (count - 1) : 0
  const fraction = fractions[index] ?? fallback
  const pin = el.querySelector('[data-pin]')
  const room = pin ? pin.getBoundingClientRect().height - window.innerHeight : 0
  const target =
    el.getBoundingClientRect().top + window.scrollY + Math.max(room, 0) * fraction
  const lenis = (window as Window & { __lenis?: { scrollTo: (t: number, o?: object) => void } })
    .__lenis
  if (lenis) lenis.scrollTo(target, { duration: 1.4 })
  else window.scrollTo({ top: target, behavior: 'smooth' })
}

/** wire cumulative stake lighting + aria-current for a plate room. A stake
    lights just before its plate frames (a small lead reads as anticipation;
    an after-the-fact light reads as lag) and stays lit — the same contract
    the old waypoint tweens kept, minus twelve timeline entries per room.
    In flow reading (no pin) every stake sits lit. */
export function bindStakeLighting(opts: {
  rootId: string
  stackSel: string
  stakeAttr: string
  /** extra attributes numbered like the stakes whose elements light in
      sync (plate numerals live outside the stake containers) */
  litAttrs?: string[]
  count: number
  gsapScrollTrigger: typeof ScrollTrigger
}): () => void {
  let raf = 0
  let fractions: number[] = []
  let lastLit = -2

  const measure = () => {
    const stack = document.querySelector<HTMLElement>(opts.stackSel)
    const frame = stack?.parentElement as HTMLElement | null
    fractions = stack && frame ? plateFractions(stack, frame) : []
  }

  const apply = () => {
    const el = document.getElementById(opts.rootId)
    if (!el) return
    const p = roomProgress(opts.rootId)
    // current = last plate whose (led) framing threshold the room passed
    let current = -1
    if (p >= 0 && fractions.length === opts.count) {
      current = 0
      for (let i = 0; i < opts.count; i++) {
        if (p >= fractions[i] - 0.06) current = i
      }
    }
    if (current === lastLit) return
    lastLit = current
    for (const attr of [opts.stakeAttr, ...(opts.litAttrs ?? [])]) {
      el.querySelectorAll<HTMLElement>(`[${attr}]`).forEach((node) => {
        const id = Number(node.getAttribute(attr))
        const lit = p < 0 || id <= current + 1
        node.toggleAttribute('data-lit', lit)
        if (attr === opts.stakeAttr) {
          if (lit && p >= 0 && id === current + 1) node.setAttribute('aria-current', 'true')
          else node.removeAttribute('aria-current')
        }
      })
    }
  }

  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(() => {
      raf = 0
      apply()
    })
  }

  measure()
  apply()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  const refresh = () => {
    measure()
    schedule()
  }
  opts.gsapScrollTrigger.addEventListener('refreshInit', measure)
  opts.gsapScrollTrigger.addEventListener('refresh', refresh)

  return () => {
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    opts.gsapScrollTrigger.removeEventListener('refreshInit', measure)
    opts.gsapScrollTrigger.removeEventListener('refresh', refresh)
    cancelAnimationFrame(raf)
  }
}
