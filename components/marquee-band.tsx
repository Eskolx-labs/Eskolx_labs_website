'use client'

import { Root, Animation } from '@/lib/scrollytelling'
import { LOAM } from '@/lib/field-controller'

/*
 * The seed catalog band, in the basement.studio marquee register: the phrase
 * travels the full viewport width against the scroll while every letter
 * pops through its own keyframed window (rise, land, settle). The band is
 * a flow chapter: it scrubs at every size that is not tiny or reduced,
 * phones included.
 */

const WORDS = ['FROM', 'SEED', 'TO', 'HARVEST']
// 17 characters drive the stagger math; PREFIX gives each letter its global
// index without mutable render state, so both strips of the loop pop in sync
const TOTAL = WORDS.join('').length
const PREFIX = (() => {
  const p = []
  let acc = 0
  for (const w of WORDS) {
    p.push(acc)
    acc += w.length
  }
  return p
})()
const TRAVEL_END = 88

export function MarqueeBand() {
  const charDuration = TRAVEL_END / TOTAL

  return (
    <Root
      id="marquee"
      start="top bottom"
      end="bottom top"
      scrub={true}
      field={{ from: LOAM, to: LOAM }}
      className="relative overflow-hidden py-14 sm:py-20"
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
          <span className="sr-only">From seed to harvest</span>
          {[0, 1].map((rep) => (
            <div key={rep} className="display flex items-baseline" aria-hidden="true">
              {WORDS.map((word, wi) => {
                const harvest = word === 'HARVEST'
                return (
                  <div key={word} className="flex items-baseline">
                    {word.split('').map((ch, i) => {
                      const gi = PREFIX[wi] + i
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
                              yPercent: 0,
                              scale: 1,
                              autoAlpha: 1,
                              ease: 'back.out(1.4)',
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
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </Animation>
    </Root>
  )
}
