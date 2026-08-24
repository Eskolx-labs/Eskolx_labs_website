'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/*
 * The ink-press: when a field turns, the new color doesn't fade in — it is
 * pressed into the paper like wet ink. A fixed overlay of the target field
 * color runs through an SVG turbulence + displacement filter whose bite
 * rises and settles across the same scroll window the field controller is
 * turning underneath, then releases once the real page has caught up.
 *
 * One pressing, one authored moment: the dawn seam presses daylight back
 * over the night field as the method chapter opens. Anchored to the seam's
 * own crossing (it has no pin), so it can never drift into the chapters
 * around it. Below md, under reduced motion, or without the filter the
 * page keeps today's smooth lerp — this layer is pure enhancement.
 */

const TURNS = [
  {
    id: 'press-dawn',
    section: '#dawn-seam',
    color: '#ece1c6',
    from: 0,
    to: 1,
    bf: '0.015 0.105',
    peak: 74,
    rest: 22,
    seed: 12,
  },
] as const

export function InkPress() {
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(
      '(prefers-reduced-motion: no-preference) and (min-width: 768px)',
      () => {
        if (typeof window === 'undefined') return
        gsap.registerPlugin(ScrollTrigger)
        // a streaming/hydrating document can lag one beat behind the effect
        // that owns this layer — wait until every plate exists, then build
        let tries = 0
        let cancelled = false
        let ctx: ReturnType<typeof gsap.context> | null = null

        const setup = () => {
          if (cancelled) return
          const ready = TURNS.every(
            (t) =>
              document.querySelector(t.section) &&
              document.querySelector(`[data-ink="${t.id}"]`) &&
              document.querySelector(`#${t.id}-disp`),
          )
          if (!ready) {
            tries += 1
            if (tries < 120) requestAnimationFrame(setup)
            return
          }
          ctx = gsap.context(() => {
            for (const t of TURNS) {
              // the dawn seam is a flow section: the press rides its own
              // crossing into the viewport, not a pin room
              const section = document.querySelector(t.section)
              const pin = section?.querySelector('[data-pin]') ?? section
              const root = document.querySelector(`[data-ink="${t.id}"]`) as HTMLElement
              const plate = root.querySelector<HTMLElement>('[data-ink-plate]')
              const disp = document.querySelector(`#${t.id}-disp`)
              if (!pin || !root || !plate || !disp) continue
              // the filtered layer sits hidden whenever its pressing isn't
              // mid-bite, so an idle plate never costs a paint
              root.style.visibility = 'hidden'
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: pin,
                  start: 'top 78%',
                  end: 'bottom 30%',
                  scrub: true,
                  invalidateOnRefresh: true,
                  onUpdate: (self) => {
                    root.style.visibility =
                      self.progress > 0 && self.progress < 1 ? 'visible' : 'hidden'
                  },
                },
                defaults: { ease: 'none' },
              })
              // the plate lands, bites, settles — then releases into the
              // settled field that has turned beneath it
              tl.fromTo(root, { opacity: 0 }, { opacity: 0.94, duration: 0.14 }, 0)
                .fromTo(disp, { attr: { scale: 0 } }, { attr: { scale: t.peak }, duration: 0.46, ease: 'power2.in' }, 0.06)
                .to(disp, { attr: { scale: t.rest }, duration: 0.38, ease: 'power2.out' }, 0.52)
                .to(root, { opacity: 0, duration: 0.16 }, 0.9)
            }
          })
        }
        setup()
        return () => {
          cancelled = true
          ctx?.revert()
        }
      },
    )
    return () => mm.revert()
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none">
      <svg className="absolute h-0 w-0" focusable="false">
        <defs>
          {TURNS.map((t) => (
            <filter
              key={t.id}
              id={t.id}
              x="-15%"
              y="-15%"
              width="130%"
              height="130%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence type="fractalNoise" baseFrequency={t.bf} numOctaves="2" seed={t.seed} result="grain" />
              <feDisplacementMap id={`${t.id}-disp`} in="SourceGraphic" in2="grain" scale="0" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          ))}
        </defs>
      </svg>
      {TURNS.map((t) => (
        <div
          key={t.id}
          data-ink={t.id}
          className="pointer-events-none fixed inset-[-8%] z-40 opacity-0 will-change-transform"
          style={{ transform: 'scale(2.16)', transformOrigin: '0 0' }}
        >
          {/* the plate is filtered at half resolution and GPU-scaled back
              up — the grain reads identically at a quarter of the cost */}
          <div
            data-ink-plate
            className="absolute left-0 top-0 h-1/2 w-1/2"
            style={{ background: t.color, filter: `url(#${t.id})` }}
          />
        </div>
      ))}
    </div>
  )
}
