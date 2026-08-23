'use client'

import { useEffect, useRef } from 'react'

/*
 * Field diagnostics: append ?debug=1 to the URL to see exactly what the
 * animation systems see in YOUR browser — whether hydration ran, whether
 * Lenis exists and is receiving your wheel, how many ScrollTriggers built,
 * and whether the field/scroll state advances as you scroll. Ships no code
 * and renders nothing without the query flag.
 */

export function DebugHud() {
  const ref = useRef<HTMLPreElement>(null)

  useEffect(() => {
    if (!location.search.includes('debug=1')) return
    const el = ref.current
    if (!el) return
    el.style.display = 'block'
    let raf = 0
    let last = 0

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick)
      if (t - last < 250) return
      last = t
      const w = window as unknown as {
        __lenis?: { velocity: number }
        gsap?: { plugins?: unknown }
      }
      const triggers = ((window as unknown as {
        __getST?: () => { progress: number; start: number; end: number }[]
      }).__getST?.() ?? []) as { progress: number; start: number; end: number }[]
      const lines = [
        `viewport ${innerWidth}x${innerHeight}`,
        `reduced ${matchMedia('(prefers-reduced-motion: reduce)').matches}`,
        `lenis ${w.__lenis ? `yes vel=${(w.__lenis.velocity || 0).toFixed(1)}` : 'MISSING'}`,
        `triggers ${triggers.length}`,
        `scrollY ${Math.round(scrollY)}`,
        `field ${getComputedStyle(document.body).getPropertyValue('--field-bg').trim().slice(0, 15)}`,
        ...triggers.slice(0, 6).map((tr, i) => `st[${i}] p=${tr.progress.toFixed(2)} [${Math.round(tr.start)}→${Math.round(tr.end)}]`),
      ]
      el.textContent = lines.join('\n')
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (!ref) return null
  return (
    <pre
      ref={ref}
      style={{ display: 'none' }}
      className="fixed bottom-4 left-4 z-[9999] rounded-sm bg-black/85 p-3 font-mono text-[11px] leading-relaxed text-lime-300"
    />
  )
}
