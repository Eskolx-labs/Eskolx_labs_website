'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { Root, Pin, Animation } from '@/lib/scrollytelling'
import { PARCHMENT, LOAM } from '@/lib/field-controller'
import { SealMark } from '@/components/botanical/seal-mark'
import { GithubIcon } from '@/components/brand-icons'

/*
 * The cover of the almanac: the script wordmark, big and dead-centered on
 * the night field. It is the whole page - no motto, no mission, no copy -
 * just the mark, a scroll cue, and one quiet action. The wordmark holds
 * its ground through the pin, then lifts away in the tail as the field
 * turns to day for the motto spread.
 *
 * Resting state (no-JS, mobile, reduced motion): the static cover - the
 * wordmark settled and reading, the cue and the action beneath it.
 */
export function Hero() {
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

  return (
    <Root
      id="top"
      start="top top"
      end="bottom bottom"
      scrub={true}
      field={{ from: LOAM, to: PARCHMENT, turnAt: [0.88, 1] }}
      mobilePins
    >
      <Pin height="200vh" mobileHeight="150vh" pinMobile>
        <section className="relative flex h-full flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-24 max-md:pt-20 max-md:pb-16 sm:px-6">
          {/* the centerpiece: one lockup, dead-centered, the only word on
              the cover. The nav carries its own small wordmark from the
              first paint, so the mark belongs to this spread alone. */}
          <div
            data-hero-mark
            className="pointer-events-none z-10 flex items-center gap-[0.85em] text-[clamp(3rem,9vw,7.5rem)]"
          >
            <span className="font-script field-ink leading-none">
              Eskolx Labs
            </span>
            <SealMark
              label="Eskolx Labs seal"
              data-hero-lockseal
              className="h-[0.62em] w-[0.62em] translate-y-[0.06em] text-[clamp(3rem,9vw,7.5rem)]"
            />
          </div>

          {/* the cue yields to the next spread as the reader commits */}
          <Animation target="[data-hero-cue]" start={0} end={12} to={{ opacity: 0 }}>
            <a
              data-hero-cue
              href="#motto"
              className="relative z-10 mt-12 flex items-center justify-center gap-3 text-sm field-ink-soft transition-colors hover:field-ink max-md:mt-8 md:mx-auto md:w-fit"
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

          {/* one resting action: a non-scroller gets a single quiet door.
              Phones keep it for the whole cover; the real CTA block lives
              on the thesis spread and takes over from md. */}
          <Animation target="[data-resting-cta]" start={40} end={48} to={{ autoAlpha: 0 }}>
            <a
              data-resting-cta
              href="https://github.com/eskolx-labs"
              target="_blank"
              rel="noreferrer"
              className="relative z-10 mt-5 inline-flex items-center gap-2 rounded-sm border border-field-ink/30 px-4 py-2 text-sm text-field-ink transition-colors hover:border-field-ink hover:bg-field-ink/5 max-md:mt-4 max-md:!opacity-100 max-md:!visible"
            >
              <GithubIcon className="h-4 w-4" />
              Explore the repos
            </a>
          </Animation>

          {/* the wordmark hands the spread to the motto: it lifts and
              fades before the field turns to day over the empty cover */}
          <Animation
            target="[data-hero-mark]"
            start={80}
            end={90}
            to={{ y: -40, autoAlpha: 0 }}
          />
        </section>
      </Pin>
    </Root>
  )
}
