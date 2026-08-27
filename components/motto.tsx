'use client'

import { Root, Pin, Animation } from '@/lib/scrollytelling'
import { PARCHMENT, LOAM } from '@/lib/field-controller'

/*
 * The motto spread: the day field, dead-centered, and one word owns the
 * page at rest - "DeepLearning", the buzzword, all in one compound. Only
 * when you scroll does it decompose: the "ing" peels off and dies, Deep
 * and Learn trade back into the thesis "Learn Deep", and "build
 * expertise." settles beneath. Then the whole spread lifts away and the
 * field turns to night for the thesis spread.
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

          {/* the decomposition, in em offsets so any viewport scales it:
              at rest the words read DeepLearning, one sharp compound.
              Scrolling, the ing peels off and dies, Learn and Deep trade
              back into the motto - which is now earned - and the promise
              rises under them. Offsets are measured IM Fell widths:
              Learn 2.5em, Deep 2.26em, word gap 0.24em. */}
          <Animation
            target="[data-motto-ing]"
            start={10}
            end={24}
            fromTo={[
              { x: '0em', autoAlpha: 1 },
              { x: '2.6em', y: '-0.85em', rotation: 14, autoAlpha: 0, ease: 'power2.in' },
            ]}
          />
          {/* the trade-back: Learn and Deep slide apart into the thesis,
              dipping and lifting around one another - a handoff, not a
              collision */}
          <Animation
            target="[data-motto-learn]"
            start={12}
            end={26}
            fromTo={[{ x: '2.5em' }, { x: '0em' }]}
          />
          <Animation
            target="[data-motto-deep]"
            start={12}
            end={26}
            fromTo={[{ x: '-2.74em' }, { x: '0em' }]}
          />
          <Animation target="[data-motto-learn]" start={12} end={18} to={{ y: '0.18em' }} />
          <Animation target="[data-motto-learn]" start={18} end={26} to={{ y: '0em' }} />
          <Animation target="[data-motto-deep]" start={12} end={18} to={{ y: '-0.18em' }} />
          <Animation target="[data-motto-deep]" start={18} end={26} to={{ y: '0em' }} />
          {/* the promise is not on the stage at rest - the buzzword owns
              the page. It rises only as the words settle into the motto. */}
          <Animation
            target="[data-motto-promise]"
            start={16}
            end={28}
            fromTo={[{ opacity: 0 }, { opacity: 1, ease: 'power2.out' }]}
          />

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
