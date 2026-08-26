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
              end: () => `+=${(room() - window.innerHeight) * 0.2}`,
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
      field={{ from: LOAM, to: PARCHMENT, turnAt: [0.9, 1] }}
      mobilePins
    >
      {/* the cover joins the mobile pin tier: phones and short windows get
          the full lift room - night holds, the motto performs, the mission
          rises, and the field turns across the content-empty tail. A pinned
          shell also never scrolls under the nav. */}
      <Pin height="300vh" mobileHeight="220vh" pinMobile>
        <section className="relative flex h-full flex-col items-center justify-center gap-10 overflow-hidden px-4 pt-24 pb-20 max-md:gap-6 max-md:pt-20 max-md:pb-12 sm:px-6 [@media(min-width:768px)_and_(max-height:899.9px)]:gap-7 [@media(min-width:768px)_and_(max-height:899.9px)]:pb-10 [@media(min-width:768px)_and_(max-height:899.9px)]:pt-16">
          <div
            ref={markRef}
            className="pointer-events-none z-10 flex items-center gap-[0.55em] motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:absolute motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:left-1/2 motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:top-[19%] motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:-translate-x-1/2"
          >
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

          {/* the motto stage, dead-centered on tall desktop and flowing on
              phones. The resting state IS the thesis: Learn Deep / build
              expertise., with the mission already beneath it - no hidden
              words, no compound. The interruption is a scroll beat, not a
              loading state. */}
          <div
            data-motto
            className="z-10 w-full select-none px-4 text-center max-md:px-2 motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:absolute motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:inset-x-0 motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:top-[42%] motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:-translate-y-1/2"
            aria-hidden="true"
          >
            <span className="block whitespace-nowrap">
              <span data-motto-wording className="display block whitespace-nowrap text-[clamp(2.6rem,7.5vw,5.75rem)] leading-[1.04] field-ink">
                <span data-motto-learn className="inline-block will-change-transform">Learn</span>
                <span data-motto-deep className="ml-[0.24em] inline-block will-change-transform">Deep</span>
                <span data-motto-ing className="inline-block will-change-transform">ing</span>
              </span>
            </span>
            <span data-motto-promise className="display block text-[clamp(1.5rem,3.6vw,2.6rem)] leading-[1.15] field-ink-soft">
              build <em className="text-wine-400">expertise.</em>
            </span>
          </div>

          <div
            data-hero-copy
            className="z-10 w-full max-w-3xl px-4 text-center max-md:px-2 motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:absolute motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:bottom-[9%] motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:left-0 motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:right-0"
          >
            {/* the mission rises directly beneath the promise: one column.
                On tall desktop the motto stage owns the center and the copy
                reads from the bottom band; below that the two flow. */}
            <div className="h-[0.2em] max-md:hidden" aria-hidden="true" />

            {/* the interruption and the settle, in em offsets so any viewport
                scales it: at rest the words read Learn Deep. Scrolling, the
                buzzword grabs them - Learn slides right, Deep slides left,
                the ing attaches - a single sharp compound. The ing peels
                away, the promise dims, and the words trade back into the
                motto, which is now earned. Offsets are measured IM Fell
                widths: Learn 2.535em, Deep 2.283em, word gap 0.24em. */}
            <Animation
              target="[data-motto-learn]"
              start={18}
              end={24}
              to={{ x: '2.52em' }}
            />
            <Animation
              target="[data-motto-deep]"
              start={18}
              end={24}
              to={{ x: '-2.78em' }}
            />
            <Animation
              target="[data-motto-ing]"
              start={18}
              end={22}
              to={{ x: '2.52em', autoAlpha: 1 }}
            />
            {/* the buzzword dims the real statement while it holds */}
            <Animation target="[data-motto-promise]" start={20} end={24} to={{ opacity: 0.32 }} />
            <Animation target="[data-motto-promise]" start={34} end={40} to={{ opacity: 1 }} />
            {/* the peel: the ing drifts off and dies */}
            <Animation
              target="[data-motto-ing]"
              start={24}
              end={32}
              to={{ x: '3.12em', y: '-0.85em', rotation: 14, autoAlpha: 0, ease: 'power2.in' }}
            />
            {/* the settle: Learn and Deep trade back into the motto, dipping
                and lifting around one another - a handoff, not a collision */}
            <Animation
              target="[data-motto-learn]"
              start={32}
              end={40}
              fromTo={[{ x: '2.52em' }, { x: '0em', immediateRender: false }]}
            />
            <Animation
              target="[data-motto-deep]"
              start={32}
              end={40}
              fromTo={[{ x: '-2.78em' }, { x: '0em', immediateRender: false }]}
            />
            <Animation target="[data-motto-learn]" start={32} end={36} to={{ y: '0.18em' }} />
            <Animation target="[data-motto-learn]" start={36} end={40} to={{ y: '0em' }} />
            <Animation target="[data-motto-deep]" start={32} end={36} to={{ y: '-0.18em' }} />
            <Animation target="[data-motto-deep]" start={36} end={40} to={{ y: '0em' }} />

            <h1
              className="display mt-8 text-[clamp(2.4rem,5.6vw,4.25rem)] leading-[1.06] field-ink max-md:mt-6"
              aria-label="Learn deep, build expertise. The only way to understand something is to build it."
            >
              <span aria-hidden="true" className="block">
                {LINES.map((line, i) => (
                  <span key={i} className="block overflow-hidden">
                    <Animation
                      target={`[data-hero-line="${i}"]`}
                      start={44 + i * 2.5}
                      end={49 + i * 2.5}
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

            <Animation target="[data-hero-sub]" start={58} end={64} fromTo={[{ y: 24, opacity: 0 }, { y: 0, opacity: 1 }]}>
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

            <Animation target="[data-hero-cta]" start={60} end={66} fromTo={[{ y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }]}>
              <div data-hero-cta className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:flex-wrap max-md:hidden">
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
          <Animation target="[data-hero-copy]" start={82} end={90} to={{ y: -64, opacity: 0 }} />

          <Animation target="[data-hero-cue]" start={0} end={8} to={{ opacity: 0 }}>
            <a
              data-hero-cue
              href="#ecosystem"
              className="relative z-10 mt-10 flex items-center justify-center gap-3 text-sm field-ink-soft transition-colors hover:field-ink max-md:mt-6 md:mx-auto md:w-fit motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:absolute motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:bottom-[7%] motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:left-1/2 motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:-translate-x-1/2 motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:mt-0"
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

          {/* one resting action: a non-scroller never sees the mission or the
              CTA block until they scroll, so the cover carries a quiet single
              action beneath the cue. It yields as the real CTA block rises. */}
          <Animation target="[data-resting-cta]" start={56} end={60} to={{ autoAlpha: 0 }}>
            <a
              data-resting-cta
              href="https://github.com/eskolx-labs"
              target="_blank"
              rel="noreferrer"
              className="relative z-10 mt-5 inline-flex items-center gap-2 rounded-sm border border-field-ink/30 px-4 py-2 text-sm text-field-ink transition-colors hover:border-field-ink hover:bg-field-ink/5 max-md:mt-4 max-md:!opacity-100 max-md:!visible motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:absolute motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:bottom-[4%] motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:left-1/2 motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:-translate-x-1/2 motion-safe:[@media(min-width:768px)_and_(min-height:900px)]:mt-0"
            >
              <GithubIcon className="h-4 w-4" />
              Explore the repos
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

const LINES = [
  { text: 'The only way' },
  { text: 'to understand something' },
  { text: 'is to ', accent: 'build it.' },
]
