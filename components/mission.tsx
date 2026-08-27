'use client'

import { Root, Pin, Animation } from '@/lib/scrollytelling'
import { PARCHMENT, LOAM } from '@/lib/field-controller'
import { GithubIcon, TelegramIcon } from '@/components/brand-icons'

/*
 * The thesis spread: night field, dead-centered, and the mission reads as
 * three lines that rise one by one - "The only way to understand
 * something is to build it." - followed by the pitch and the doors. The
 * almanac's whole point in one centered page, on dark.
 *
 * Resting CSS state (no-JS, mobile, reduced motion): the thesis, pitch
 * and doors all visible - the static spread is complete.
 */
export function Mission() {
  return (
    <Root
      id="mission"
      start="top top"
      end="bottom bottom"
      scrub={true}
      field={{ from: LOAM, to: PARCHMENT, turnAt: [0.9, 1] }}
      mobilePins
    >
      <Pin height="280vh" mobileHeight="190vh" pinMobile>
        <section className="relative flex h-full flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16 max-md:pt-20 max-md:pb-12 sm:px-6">
          <div
            data-mission-copy
            className="z-10 w-full max-w-3xl px-4 text-center max-md:px-2"
          >
            <h2
              className="display text-[clamp(2.4rem,5.6vw,4.25rem)] leading-[1.06] field-ink"
              aria-label="The only way to understand something is to build it."
            >
              <span aria-hidden="true" className="block">
                {LINES.map((line, i) => (
                  <span key={i} className="block overflow-hidden">
                    <Animation
                      target={`[data-mission-line="${i}"]`}
                      start={8 + i * 4}
                      end={16 + i * 4}
                      fromTo={[{ yPercent: 118 }, { yPercent: 0 }]}
                    >
                      <span data-mission-line={i} className="block">
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
            </h2>

            <Animation
              target="[data-mission-sub]"
              start={34}
              end={44}
              fromTo={[{ y: 24, opacity: 0 }, { y: 0, opacity: 1 }]}
            >
              <p
                data-mission-sub
                className="mx-auto mt-7 max-w-xl text-lg leading-relaxed field-ink-soft max-md:mt-5 max-md:text-base"
              >
                AI is making learning feel pointless. We hand you the
                opposite: real, hard, highly technical problems. You
                rebuild the statistical libraries everyone takes for
                granted, then turn them on questions nobody has answered.
              </p>
            </Animation>

            <Animation
              target="[data-mission-cta]"
              start={38}
              end={48}
              fromTo={[{ y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }]}
            >
              <div data-mission-cta className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:flex-wrap">
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
                <p className="mt-2 font-mono text-kicker tracking-label-snug field-ink-soft sm:order-last sm:mt-0 sm:w-full sm:text-center">
                  OPEN SOURCE · MIT LICENSE · EVERYTHING PUBLIC
                </p>
              </div>
            </Animation>
          </div>

          {/* the spread lifts away before the field turns back to day */}
          <Animation
            target="[data-mission-copy]"
            start={80}
            end={90}
            to={{ y: -64, opacity: 0 }}
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
