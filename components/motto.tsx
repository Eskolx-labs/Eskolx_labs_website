'use client'

import { Root, Pin, Animation } from '@/lib/scrollytelling'
import { PARCHMENT, LOAM } from '@/lib/field-controller'

/*
 * The motto spread: the day field, dead-centered, and one word owns the
 * page at rest - "DeepLearning", the buzzword, all in one compound. The
 * performance is four beats, strictly in order, all scrubbed to scroll:
 *
 * 1. The settle: the compound sharpens into focus on the page, pressed
 *    in from slightly small and low.
 * 2. The pluck: the ing is gripped, tensed, then flicked away alone -
 *    anticipation first, then an accelerating arc up and right, gone
 *    before anything else moves.
 * 3. The crossing: Deep ducks under Learn and slides to the back while
 *    Learn steps over it into the front - a handoff with weight, not a
 *    swap. Anticipation, the pass, then a landing with overshoot.
 * 4. The pop: only after the words have settled does "build expertise."
 *    pop in beneath with a back.out overshoot and resolve to rest.
 *
 * Then the whole spread lifts away and the field turns to night for the
 * thesis spread.
 *
 * The swap slides are em-based on purpose: every motto span shares one
 * font-size, so em offsets are exact ratios that survive any viewport
 * without measurement or refresh invalidation.
 *
 * Resting CSS state (no-JS, mobile, reduced motion): the thesis itself -
 * "Learn Deep" with the promise beneath, the ing hidden so the page
 * never reads "Deeping".
 */
export function Motto() {
  return (
    <Root
      id="motto"
      start="top top"
      end="bottom bottom"
      scrub={true}
      field={{ from: PARCHMENT, to: LOAM, turnAt: [0.9, 1] }}
      mobilePins
    >
      <Pin height="230vh" mobileHeight="170vh" pinMobile>
        <section className="relative flex h-full flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-20 max-md:pt-20 max-md:pb-14 sm:px-6">
          <h1
            className="z-10 w-full select-none px-4 text-center max-md:px-2"
            aria-label="Learn deep, build expertise."
          >
            <span aria-hidden="true" className="block whitespace-nowrap">
              <span data-motto-wording className="display block whitespace-nowrap text-[clamp(2.6rem,7.5vw,5.75rem)] leading-[1.04] field-ink">
                <span data-motto-learn className="inline-block will-change-transform">Learn</span>
                <span data-motto-deep className="ml-[0.24em] inline-block will-change-transform">Deep</span>
                <span data-motto-ing className="inline-block will-change-transform">ing</span>
              </span>
            </span>
            <span
              data-motto-promise
              aria-hidden="true"
              className="display mt-3 block text-[clamp(1.5rem,3.6vw,2.6rem)] leading-[1.15] field-ink-soft"
            >
              build <em className="text-wine-400">expertise.</em>
            </span>
          </h1>

          {/* the performance, in em offsets so any viewport scales it.
              Four beats, strictly in order, all scrubbed to scroll.

              Beat 1 (0-10) the settle: the compound presses in from
              slightly small and low - the page's first breath.

              Beat 2 (12-26) the pluck: grip, tense, flick. The ing
              pulls back a hair, then arcs away alone - x and y carry
              different eases so the path curves, and the rotation and
              shrink sell the release. Deep does not move yet.

              Beat 3 (28-50) the crossing: anticipation, the pass, the
              landing. Deep squashes down and ducks under while Learn
              stretches up and steps over - a handoff with weight, not
              a swap. The whole line breathes as they pass, and both
              settle back to the line with a soft overshoot.

              Beat 4 (52-62) the pop: only after the words have settled
              does "build expertise." land beneath with a back.out
              spring and resolve to rest.

              Offsets are measured IM Fell widths: Learn 2.5em, Deep
              2.26em, word gap 0.24em. */}
          {/* Beat 1: the settle */}
          <Animation
            target="[data-motto-wording]"
            start={0}
            end={10}
            fromTo={[
              { scale: 0.94, y: '0.15em', opacity: 0.8 },
              { scale: 1, y: '0em', opacity: 1, ease: 'power2.out' },
            ]}
          />
          {/* Beat 2: the pluck - anticipation, then the flick */}
          <Animation
            target="[data-motto-ing]"
            start={12}
            end={15}
            fromTo={[
              { x: '0em', y: '0em', scale: 1, autoAlpha: 1 },
              { x: '-0.06em', y: '0.1em', scale: 1.08, ease: 'power1.out' },
            ]}
          />
          <Animation target="[data-motto-ing]" start={15} end={26} to={{ x: '1.7em', ease: 'power2.out' }} />
          <Animation target="[data-motto-ing]" start={15} end={26} to={{ y: '-1.5em', ease: 'power2.out' }} />
          <Animation target="[data-motto-ing]" start={15} end={26} to={{ rotation: 26, scale: 0.08, autoAlpha: 0, ease: 'power2.in' }} />
          {/* Beat 3: the crossing - anticipation, the pass, the landing */}
          <Animation target="[data-motto-deep]" start={28} end={33} to={{ y: '0.12em', scaleY: 0.9, rotation: -3, ease: 'power1.out' }} />
          <Animation target="[data-motto-learn]" start={28} end={33} to={{ y: '-0.12em', scaleY: 1.08, rotation: 2, ease: 'power1.out' }} />
          <Animation
            target="[data-motto-deep]"
            start={33}
            end={45}
            fromTo={[{ x: '-2.74em' }, { x: '0em', ease: 'power2.inOut' }]}
          />
          <Animation
            target="[data-motto-learn]"
            start={33}
            end={45}
            fromTo={[{ x: '2.5em' }, { x: '0em', ease: 'power2.inOut' }]}
          />
          <Animation target="[data-motto-deep]" start={45} end={50} to={{ y: '0.05em', scaleY: 1, rotation: 0, ease: 'power2.out' }} />
          <Animation target="[data-motto-deep]" start={50} end={53} to={{ y: '0em' }} />
          <Animation target="[data-motto-learn]" start={45} end={50} to={{ y: '-0.05em', scaleY: 1, rotation: 0, ease: 'power2.out' }} />
          <Animation target="[data-motto-learn]" start={50} end={53} to={{ y: '0em' }} />
          {/* the line breathes: a micro-push as the words pass */}
          <Animation target="[data-motto-wording]" start={33} end={40} to={{ scale: 1.015 }} />
          <Animation target="[data-motto-wording]" start={40} end={50} to={{ scale: 1 }} />
          {/* Beat 4: the pop - the promise lands with a spring */}
          <Animation
            target="[data-motto-promise]"
            start={52}
            end={58}
            fromTo={[
              { y: '0.7em', scale: 0.85, opacity: 0 },
              { y: '0em', scale: 1.05, opacity: 1, ease: 'back.out(1.6)' },
            ]}
          />
          <Animation target="[data-motto-promise]" start={58} end={62} to={{ scale: 1, ease: 'power1.out' }} />

          {/* the whole spread lifts away before the field turns to night */}
          <Animation
            target="[data-motto-wording]"
            start={80}
            end={90}
            to={{ y: -48, opacity: 0 }}
          />
          <Animation
            target="[data-motto-promise]"
            start={80}
            end={90}
            to={{ y: -48, opacity: 0 }}
          />
        </section>
      </Pin>
    </Root>
  )
}
