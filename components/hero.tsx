'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Root, Pin, Animation } from '@/lib/scrollytelling'
import { PARCHMENT, LOAM } from '@/lib/field-controller'
import { SealMark } from '@/components/botanical/seal-mark'
import { GithubIcon, TelegramIcon } from '@/components/brand-icons'

const LINES = [
  { text: 'The only way' },
  { text: 'to understand something' },
  { text: 'is to ', accent: 'build it.' },
]

/*
 * The cover of the almanac, in the minimal-goods register: the script
 * wordmark opens the book — enormous, centered, sealed — and docks into the
 * nav rail as the reader pulls the cover away (scrubbed across most of the
 * pin). The mission rises in behind it through masked lines, rides the room,
 * and exits before the page turns loam underneath.
 *
 * Resting CSS state (no-JS, mobile, reduced motion): wordmark centered,
 * copy beneath it — the complete cover, static.
 */
export function Hero() {
  const markRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)

  // load-time arrival: the lockup settles and its seal stamps. The mission
  // copy stays owned by the scrubbed timeline — it rises as the reader
  // pulls the cover, within the first breath of travel.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-mark]',
        { autoAlpha: 0, y: 26 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.15 },
      )
      gsap.fromTo(
        '[data-hero-lockseal]',
        { scale: 2.2, rotate: -14 },
        { scale: 1, rotate: 0, duration: 0.55, ease: 'power4.in', delay: 0.55 },
      )
    })
    return () => ctx.revert()
  }, [])

  // the dock: measured against the live nav slot. All geometry comes from
  // the never-transformed wrapper (markRef), whose flex-centered rect is
  // identical at any point in the pin — so invalidateOnRefresh can safely
  // re-measure after late font swaps or resizes without feedback drift.
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
      const wrapper = markRef.current
      const mark = wrapper?.querySelector('[data-hero-mark]')
      const navLogo = document.querySelector<HTMLAnchorElement>('header a[href="#top"]')
      if (!wrapper || !mark || !navLogo) return
      const ctx = gsap.context(() => {
        const target = () => {
          const w0 = wrapper.getBoundingClientRect()
          const n0 = navLogo.getBoundingClientRect()
          return {
            s1: (n0.height / Math.max(w0.height, 1)) * 0.96,
            x1: n0.left + n0.width / 2 - (w0.left + w0.width / 2),
            y1: n0.top + n0.height / 2 - (w0.top + w0.height / 2),
          }
        }
        const room = () =>
          (wrapper.closest('[data-pin]') as HTMLElement | null)?.offsetHeight ??
          window.innerHeight * 3
        gsap.fromTo(
          mark,
          { scale: 1, x: 0, y: 0 },
          {
            scale: () => target().s1,
            x: () => target().x1,
            y: () => target().y1,
            ease: 'none',
            scrollTrigger: {
              trigger: '#top',
              start: 'top top',
              end: () => `+=${(room() - window.innerHeight) * 0.55}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        )
      })
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  return (
    <Root
      id="top"
      start="top top"
      end="bottom bottom"
      scrub={true}
      field={{ from: LOAM, to: PARCHMENT }}
    >
      <Pin height="300vh">
        <section className="relative flex h-full flex-col items-center justify-center gap-12 overflow-hidden px-4 pt-24 pb-20 sm:px-6 [@media(min-width:768px)_and_(max-height:899px)]:gap-8 [@media(min-width:768px)_and_(max-height:899px)]:pb-10 [@media(min-width:768px)_and_(max-height:899px)]:pt-16 [@media(min-width:768px)_and_(min-height:900px)]:gap-16 [@media(min-width:768px)_and_(min-height:900px)]:py-0">
          <div ref={markRef} className="pointer-events-none z-10 flex items-center gap-[0.55em]">
            <div data-hero-mark className="flex items-center gap-[0.85em] text-[clamp(3.25rem,13vw,10rem)]">
              <span className="font-script field-ink leading-none">
                Eskolx Labs
              </span>
              <SealMark
                label="Eskolx Labs seal"
                data-hero-lockseal
                className="h-[0.62em] w-[0.62em] translate-y-[0.06em] text-[clamp(3.25rem,13vw,10rem)]"
              />
            </div>
          </div>

          <div
            ref={copyRef}
            data-hero-copy
            className="z-10 max-w-3xl px-4 text-center md:mx-auto md:w-full [@media(min-width:768px)_and_(min-height:900px)]:absolute [@media(min-width:768px)_and_(min-height:900px)]:bottom-[6%] [@media(min-width:768px)_and_(min-height:900px)]:left-0 [@media(min-width:768px)_and_(min-height:900px)]:right-0"
          >
            <h1
              className="display text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[1.06] field-ink"
              aria-label="The only way to understand something is to build it."
            >
              <span aria-hidden="true" className="block">
                {LINES.map((line, i) => (
                  <span key={i} className="block overflow-hidden">
                    <Animation
                      target={`[data-hero-line="${i}"]`}
                      start={6 + i * 5}
                      end={6 + i * 5 + 15}
                      fromTo={[{ yPercent: 118 }, { yPercent: 0 }]}
                    >
                      <span data-hero-line={i} className="block">
                        {line.accent ? (
                          <>
                            {line.text}
                            <em className="text-wine-400">{line.accent}</em>
                          </>
                        ) : (
                          line.text
                        )}
                      </span>
                    </Animation>
                  </span>
                ))}
              </span>
            </h1>

            <Animation target="[data-hero-sub]" start={22} end={38} fromTo={[{ y: 24, opacity: 0 }, { y: 0, opacity: 1 }]}>
              <p
                data-hero-sub
                className="mx-auto mt-7 max-w-xl text-lg leading-relaxed field-ink-soft"
              >
                We solve the problem AI is causing in education. Learning has
                started to look pointless, so we hand anyone interested real,
                difficult, highly technical problems instead. You rebuild the
                statistical libraries everyone takes for granted, then point
                them at questions nobody has answered.
              </p>
            </Animation>

            <Animation target="[data-hero-cta]" start={26} end={40} fromTo={[{ y: 20, opacity: 0 }, { y: 0, opacity: 1 }]}>
              <div data-hero-cta className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
                <a
                  href="https://github.com/eskolx-labs"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-plate btn-wine text-base"
                >
                  <GithubIcon className="h-5 w-5" />
                  Explore GitHub
                </a>
                <a
                  href="https://t.me/eskolx_labs"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-plate btn-outline text-base"
                >
                  <TelegramIcon className="h-5 w-5" />
                  Join the Community
                </a>
                <p className="mt-2 font-mono text-xs tracking-[0.14em] field-ink-soft sm:mt-0 sm:w-full sm:text-center">
                  OPEN SOURCE · MIT LICENSE · EVERYTHING PUBLIC
                </p>
              </div>
            </Animation>
          </div>

          {/* the whole spread lifts away as the chapter closes */}
          <Animation target="[data-hero-copy]" start={80} end={96} to={{ y: -64, opacity: 0 }} />

          <Animation target="[data-hero-cue]" start={0} end={8} to={{ opacity: 0 }}>
            <a
              data-hero-cue
              href="#ecosystem"
              className="relative z-10 mt-10 flex items-center justify-center gap-3 text-sm field-ink-soft transition-colors hover:field-ink md:mx-auto md:w-fit [@media(min-width:768px)_and_(min-height:900px)]:absolute [@media(min-width:768px)_and_(min-height:900px)]:bottom-7 [@media(min-width:768px)_and_(min-height:900px)]:left-1/2 [@media(min-width:768px)_and_(min-height:900px)]:mt-0 [@media(min-width:768px)_and_(min-height:900px)]:-translate-x-1/2"
            >
              <span>Scroll to open the almanac</span>
              <svg viewBox="0 0 16 20" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M8 2 V16 M3.5 11.5 L8 16.5 L12.5 11.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </Animation>

          <Animation
            target="[data-hero-mark]"
            start={90}
            end={100}
            to={{ autoAlpha: 0 }}
          />
        </section>
      </Pin>
    </Root>
  )
}
