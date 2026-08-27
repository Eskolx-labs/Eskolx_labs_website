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
  y = 24,
  start = 'top 90%',
  end = 'top 60%',
  stagger = 0.07,
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
      // opacity-only, never autoAlpha: visibility:hidden removes content
      // from the tab order, so the footer links and FAQ rows were
      // unreachable by keyboard until their reveal fired. With opacity
      // alone a Tab lands on the hidden link, the browser scrolls it
      // into view, and the trigger fires — the content reveals on focus.
      // The rise carries a hair of scale (0.985) — the book's entrance
      // grammar, compositor-only (transform + opacity, no filter cost).
      gsap.fromTo(
        targets,
        { opacity: 0, y, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'power2.out',
          stagger,
          scrollTrigger: { trigger: el, start, end, scrub: 0.2 },
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
