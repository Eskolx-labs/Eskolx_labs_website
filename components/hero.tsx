'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Root, Pin, Animation } from '@/lib/scrollytelling'
import { PARCHMENT, LOAM } from '@/lib/field-controller'
import { SealMark } from '@/components/botanical/seal-mark'
import { GithubIcon, TelegramIcon } from '@/components/brand-icons'

/*
 * The cover of the almanac. The script wordmark opens the book and docks
 * into the nav rail. Then the motto performs: DeepLearning rises as one
 * compound word, the "ing" peels off and drifts away, Deep and Learn slide
 * past each other into "Learn Deep", and "build expertise." settles under
 * it. Only then do the mission lines rise. Every beat is scrubbed scroll
 * travel through the Root timeline - nothing plays on a clock.
 *
 * The swap slides are em-based on purpose: every motto span shares one
 * font-size, so em offsets are exact ratios that survive any viewport
 * without measurement or refresh invalidation.
 *
 * Resting CSS state (no-JS, mobile, reduced motion): the complete cover
 * static - wordmark, motto in its final form, mission, actions.
 */
export function Hero() {
  const markRef = useRef<HTMLDivElement>(null)

  // load-time arrival: the lockup settles and its seal stamps. Everything
  // else is owned by the scrubbed timeline.
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
  // identical at any point in the pin - so invalidateOnRefresh can safely
  // re-measure after late font swaps or resizes without feedback drift.
  useEffect(() => {
    const mm = gsap.matchMedia()
    // the dock and the nav's logo-hide are one contract: a tall pinned hero.
    // The nav gate carries (min-height: 700px); without it here the mark
    // flew onto an empty rail slot on short desktop windows while the real
    // logo sat beside it - two wordmarks on one rail.
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px) and (min-height: 700px)', () => {
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
              end: () => `+=${(room() - window.innerHeight) * 0.24}`,
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
      field={{ from: LOAM, to: PARCHMENT, turnAt: [0.92, 1] }}
      mobilePins
    >
      {/* the cover joins the mobile pin tier: phones and short windows get
          the full lift room - night holds, the motto performs, the mission
          rises, and the field turns across the content-empty tail. A pinned
          shell also never scrolls under the nav. */}
      <Pin height="400vh" mobileHeight="260vh" pinMobile>
        <section className="relative flex h-full flex-col items-center justify-center gap-10 overflow-hidden px-4 pt-24 pb-20 max-md:gap-6 max-md:pt-20 max-md:pb-12 sm:px-6 [@media(min-width:768px)_and_(max-height:899.9px)]:gap-7 [@media(min-width:768px)_and_(max-height:899.9px)]:pb-10 [@media(min-width:768px)_and_(max-height:899.9px)]:pt-16">
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
            data-hero-copy
            className="z-10 w-full max-w-3xl px-4 text-center max-md:px-2"
          >
            {/* the motto: DeepLearning decomposes into Learn Deep, and the
                promise under it. The h1 carries both motto and mission so
                the cover reads as one statement to screen readers. */}
            <div data-motto className="select-none" aria-hidden="true">
              <span className="block overflow-hidden">
                <Animation
                  target="[data-motto-wording]"
                  start={24}
                  end={36}
                  fromTo={[{ yPercent: 120 }, { yPercent: 0 }]}
                >
                  <span data-motto-wording className="display block whitespace-nowrap text-[clamp(2.6rem,7.5vw,5.75rem)] leading-[1.04] field-ink">
                    <span data-motto-learn className="inline-block will-change-transform">Learn</span>
                    <span data-motto-deep className="ml-[0.24em] inline-block will-change-transform">Deep</span>
                    <span data-motto-ing className="inline-block will-change-transform">ing</span>
                  </span>
                </Animation>
              </span>
              <span className="block overflow-hidden">
                <Animation
                  target="[data-motto-promise]"
                  start={58}
                  end={68}
                  fromTo={[{ yPercent: 120 }, { yPercent: 0 }]}
                >
                  <span data-motto-promise className="display block text-[clamp(1.5rem,3.6vw,2.6rem)] leading-[1.15] field-ink-soft">
                    build <em className="text-wine-400">expertise.</em>
                  </span>
                </Animation>
              </span>
            </div>

            {/* the decomposition, in em offsets so any viewport scales it:
                at rest the words sit swapped (Deep first, Learn second, ing
                attached after Learn) and read DeepLearning; the peel sends
                ing drifting away, then the swap slides Learn and Deep past
                each other into the motto. Offsets are measured IM Fell
                widths: Learn 2.535em, Deep 2.283em, word gap 0.24em. */}
            <Animation
              target="[data-motto-learn]"
              start={48}
              end={58}
              fromTo={[{ x: '2.52em' }, { x: '0em' }]}
            />
            <Animation
              target="[data-motto-deep]"
              start={48}
              end={58}
              fromTo={[{ x: '-2.78em' }, { x: '0em' }]}
            />
            {/* the trade: as the words slide past each other they dip and
                lift around one another, then settle level - a handoff, not
                a collision */}
            <Animation target="[data-motto-learn]" start={48} end={53} to={{ y: '0.18em' }} />
            <Animation target="[data-motto-learn]" start={53} end={58} to={{ y: '0em' }} />
            <Animation target="[data-motto-deep]" start={48} end={53} to={{ y: '-0.18em' }} />
            <Animation target="[data-motto-deep]" start={53} end={58} to={{ y: '0em' }} />
            <Animation
              target="[data-motto-ing]"
              start={42}
              end={52}
              fromTo={[
                { x: '0em', y: '0em', rotation: 0, autoAlpha: 1 },
                { x: '0.6em', y: '-0.85em', rotation: 14, autoAlpha: 0, ease: 'power2.in' },
              ]}
            />

            <h1
              className="display mt-8 text-[clamp(2.4rem,5.6vw,4.25rem)] leading-[1.06] field-ink max-md:mt-6"
              aria-label="Learn deep, build expertise. The only way to understand something is to build it."
            >
              <span aria-hidden="true" className="block">
                {LINES.map((line, i) => (
                  <span key={i} className="block overflow-hidden">
                    <Animation
                      target={`[data-hero-line="${i}"]`}
                      start={70 + i * 2.7}
                      end={76 + i * 2.7}
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

            <Animation target="[data-hero-sub]" start={78} end={84} fromTo={[{ y: 24, opacity: 0 }, { y: 0, opacity: 1 }]}>
              <p
                data-hero-sub
                className="mx-auto mt-7 max-w-xl text-lg leading-relaxed field-ink-soft max-md:mt-5 max-md:text-base"
              >
                AI is making learning feel pointless. We hand you the opposite:
                real, hard, highly technical problems. You rebuild the
                statistical libraries everyone takes for granted, then turn
                them on questions nobody has answered.
              </p>
            </Animation>

            <Animation target="[data-hero-cta]" start={80} end={86} fromTo={[{ y: 20, opacity: 0 }, { y: 0, opacity: 1 }]}>
              <div data-hero-cta className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:flex-wrap">
                <a
                  href="https://github.com/eskolx-labs"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-plate btn-wine text-base"
                >
                  <GithubIcon className="h-5 w-5" />
                  Explore the repos
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
                <p className="mt-2 font-mono text-kicker tracking-label-snug field-ink-soft max-md:hidden sm:order-last sm:mt-0 sm:w-full sm:text-center">
                  OPEN SOURCE · MIT LICENSE · EVERYTHING PUBLIC
                </p>
              </div>
            </Animation>
          </div>

          {/* the whole spread lifts away before the field turns: the cover
              reads on settled night, empties, then the page-turn runs in
              the tail (turnAt 0.92-1) over nothing but the mark's fade */}
          <Animation target="[data-hero-copy]" start={86} end={93} to={{ y: -64, opacity: 0 }} />

          <Animation target="[data-hero-cue]" start={0} end={8} to={{ opacity: 0 }}>
            <a
              data-hero-cue
              href="#ecosystem"
              className="relative z-10 mt-10 flex items-center justify-center gap-3 text-sm field-ink-soft transition-colors hover:field-ink max-md:mt-6 md:mx-auto md:w-fit"
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
            start={92}
            end={100}
            to={{ autoAlpha: 0 }}
          />
        </section>
      </Pin>
    </Root>
  )
}

const LINES = [
  { text: 'The only way' },
  { text: 'to understand something' },
  { text: 'is to ', accent: 'build it.' },
]
