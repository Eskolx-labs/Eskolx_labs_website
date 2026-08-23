'use client'

import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger)
      registered = true
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ScrollTrigger.config({ ignoreMobileResize: true })

    // web fonts swap in late on real browsers and shift every measured
    // trigger; refresh once the faces land so pins and docks stay true.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    ;(window as Window & { __getST?: () => unknown[] }).__getST = () =>
      ScrollTrigger.getAll()

    let lenis: Lenis | null = null
    if (!reduced) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => 1 - Math.pow(2, -10 * t),
        smoothWheel: true,
      })
      ;(window as Window & { __lenis?: Lenis }).__lenis = lenis
      lenis.on('scroll', ScrollTrigger.update)
      const raf = (time: number) => lenis?.raf(time * 1000)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)
      return () => {
        gsap.ticker.remove(raf)
        lenis?.destroy()
        delete (window as Window & { __lenis?: Lenis }).__lenis
      }
    }

    return () => {}
  }, [])

  return <>{children}</>
}
