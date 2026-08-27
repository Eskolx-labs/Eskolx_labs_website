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
 * The performance, in the motto's register:
 * Beat 1 (0-15) the rise: the room opens with the first line already
 *   mid-rise (start -4) - the spread is speaking when you arrive, never
 *   blank. The lines overlap so the eye flows, each landing with
 *   power4.out (the masked-line register: fast start, decelerate, no
 *   overshoot - an overshoot would clip against the mask).
 * Beat 2 (15-21) the accent: "build it." pops with a back.out spring
 *   after its line settles - the thesis lands, the way the motto's
 *   promise does. The whole line breathes as it lands.
 * Beat 3 (24-38) the doors: the pitch presses in slightly compressed,
 *   then the CTA block steps in beneath it.
 * Beat 4 (80-88) the hand-off: the whole spread lifts away with a slight
 *   turn as the field turns back to day for the seal.
 *
 * Resting CSS state (no-JS, mobile, reduced motion): the thesis, pitch
 * and doors all visible - the static spread is complete.
 */

// the rise: line 0 starts before the timeline (start -4) so the room
// opens with the first line already mid-rise; the lines overlap so the
// eye flows from one to the next instead of stepping
const LINE_RISE: [number, number][] = [
  [-4, 7],
  [3, 11],
  [7, 15],
]
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
              <span aria-hidden="true" className="block" data-mission-wording>
                {LINES.map((line, i) => (
                  <span key={i} className="block">
                    {line.accent ? (
                      /* the accent line: the mask hugs only the lead text,
                         so the accent's spring can overshoot freely */
                      <span className="inline-flex items-baseline">
                        <span className="inline-block overflow-hidden">
                          <Animation
                            target={`[data-mission-line="${i}"]`}
                            start={LINE_RISE[i][0]}
                            end={LINE_RISE[i][1]}
                            fromTo={[{ yPercent: 118 }, { yPercent: 0, ease: 'power4.out' }]}
                          >
                            <span data-mission-line={i} className="block">
                              {line.text}
                            </span>
                          </Animation>
                        </span>
                        <em data-mission-accent className="text-wine-400">
                          {line.accent}
                        </em>
                      </span>
                    ) : (
                      <span className="block overflow-hidden">
                        <Animation
                          target={`[data-mission-line="${i}"]`}
                          start={LINE_RISE[i][0]}
                          end={LINE_RISE[i][1]}
                          fromTo={[{ yPercent: 118 }, { yPercent: 0, ease: 'power4.out' }]}
                        >
                          <span data-mission-line={i} className="block">
                            {line.text}
                          </span>
                        </Animation>
                      </span>
                    )}
                  </span>
                ))}
              </span>

              {/* the accent lands after its line settles: "build it." pops
                  with a spring while the whole line breathes */}
              <Animation
                target="[data-mission-accent]"
                start={15}
                end={21}
                fromTo={[
                  { scale: 0.82, autoAlpha: 0 },
                  { scale: 1, autoAlpha: 1, ease: 'back.out(1.6)' },
                ]}
              />
              <Animation target="[data-mission-wording]" start={15} end={19} to={{ scale: 1.012 }} />
              <Animation target="[data-mission-wording]" start={19} end={24} to={{ scale: 1 }} />
            </h2>

            <Animation
              target="[data-mission-sub]"
              start={24}
              end={32}
              fromTo={[{ y: 24, scale: 0.985, opacity: 0 }, { y: 0, scale: 1, opacity: 1, ease: 'power2.out' }]}
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
              start={30}
              end={38}
              fromTo={[{ y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: 'power2.out' }]}
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

          {/* the spread hands the book to the seal: it lifts away with a
              slight turn as the field turns back to day */}
          <Animation
            target="[data-mission-copy]"
            start={80}
            end={88}
            to={{ y: -64, rotation: 1.2, opacity: 0, ease: 'power1.in' }}
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
