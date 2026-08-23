'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/*
 * The come-and-go layer. Standalone scrubbed reveals that run at every
 * width — unlike the Root timelines, which below lg deliberately never
 * build. Each Reveal owns one ScrollTrigger over its own box: content
 * rises in as the box enters, sinks back as it leaves, identical in both
 * directions. Nothing pre-hides in CSS: without JS or with reduced motion
 * the content simply sits visible.
 *
 * Wrap only containers that no Root timeline tween targets — Reveal must
 * never share an element with a scrubbed beat.
 */

type RevealProps = {
  children: ReactNode
  className?: string
  y?: number
  start?: string
  end?: string
  stagger?: number
}

export function Reveal({
  children,
  className,
  y = 34,
  start = 'top 88%',
  end = 'top 54%',
  stagger = 0.09,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    const items = el.querySelectorAll('[data-reveal-item]')
    const targets = items.length > 0 ? Array.from(items) : [el]
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          ease: 'power2.out',
          stagger,
          scrollTrigger: { trigger: el, start, end, scrub: 0.3 },
        },
      )
    }, el)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
