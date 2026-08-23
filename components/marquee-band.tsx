'use client'

import { Root, Animation } from '@/lib/scrollytelling'
import { LOAM } from '@/lib/field-controller'

/*
 * The seed catalog band, in the basement.studio marquee register: the phrase
 * travels the full viewport width against the scroll while every letter
 * pops through its own keyframed window (rise, land, settle). Below lg the
 * timeline never builds and the phrase sits as a static strip.
 */

const WORDS = ['FROM', 'SEED', 'TO', 'HARVEST']
const TOTAL = WORDS.join('').length // 18 characters drive the stagger math
const TRAVEL_END = 88

export function MarqueeBand() {
  const charDuration = TRAVEL_END / TOTAL
  let charIndex = 0

  return (
    <Root
      id="marquee"
      start="top bottom"
      end="bottom top"
      scrub={true}
      field={{ from: LOAM, to: LOAM }}
      className="overflow-hidden py-14 sm:py-20"
    >
      <Animation
        target="[data-marquee-track]"
        start={0}
        end={TRAVEL_END}
        fromTo={[{ xPercent: 60 }, { xPercent: -62 }]}
      >
        <div
          data-marquee-track
          className="flex w-max items-baseline whitespace-nowrap will-change-transform"
        >
          {[0, 1].map((rep) => (
            <span key={rep} className="display flex items-baseline" aria-hidden={rep === 1}>
              {WORDS.map((word) => {
                const harvest = word === 'HARVEST'
                const startIdx = charIndex
                charIndex += word.length
                return (
                  <span key={word} className="flex items-baseline">
                    {word.split('').map((ch, i) => {
                      const gi = startIdx + i
                      const charStart = charDuration * gi * 0.7
                      return (
                        <Animation
                          key={`${rep}-${word}-${i}`}
                          start={charStart}
                          end={charStart + charDuration}
                          fromTo={[
                            {
                              yPercent: 42,
                              scale: 0.5,
                              autoAlpha: 0,
                              transformOrigin: 'center right',
                            },
                            {
                              keyframes: {
                                '0%': { autoAlpha: 0, scale: 0.5 },
                                '50%': { autoAlpha: 1, scale: 1 },
                                '100%': { yPercent: 0 },
                                easeEach: 'power1.out',
                              },
                              ease: 'linear',
                            },
                          ]}
                        >
                          <span
                            className={`inline-block px-[0.14em] text-[clamp(3rem,8.5vw,7.5rem)] leading-none ${
                              harvest ? 'text-wine-400' : 'field-ink'
                            }`}
                          >
                            {ch}
                          </span>
                        </Animation>
                      )
                    })}
                    <span
                      className="inline-block px-[0.28em] text-[clamp(2rem,5vw,4.5rem)] leading-none text-gold-leaf"
                      aria-hidden="true"
                    >
                      ❋
                    </span>
                  </span>
                )
              })}
            </span>
          ))}
        </div>
      </Animation>
    </Root>
  )
}
