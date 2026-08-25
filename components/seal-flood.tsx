'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { Root, Pin, Animation } from '@/lib/scrollytelling'
import { PARCHMENT } from '@/lib/field-controller'
import { SealMark } from '@/components/botanical/seal-mark'

/*
 * The interlude between method and people, and our answer to
 * minimal-goods' circle-grow: pinned in a short room, the engraved seal
 * swells past the frame while the page holds the day field steady — the
 * zoom reads as pressing the stamp into parchment, not falling into
 * night. The night turn waits for the keepers chapter past the seam.
 * The label reads first and lifts away; the emblem holds a beat at full
 * flood, then releases.
 */
export function SealFlood() {
  // below md the pin collapses, so the flood gets a one-shot stage instead:
  // label arrives, the stamp swells once, the die releases — then rests,
  // fruit-forward. No scroll tax on phones.
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference) and (max-width: 767px)', () => {
      const ctx = gsap.context(() => {
        gsap
          .timeline({
            scrollTrigger: { trigger: '#seal-flood', start: 'top 65%', once: true },
          })
          .fromTo('[data-flood-label]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 })
          .fromTo('[data-flood-seal]', { scale: 1, rotate: -6 }, { scale: 2.6, rotate: 2, duration: 1.4, ease: 'power2.inOut' }, 0.25)
          .to('#seal-flood .seal-die', { opacity: 0, duration: 0.45 }, 0.75)
          // the stamp releases fully: an oversized fruit lingering at the
          // section's edge read as broken against the keepers heading below
          .to('[data-flood-seal]', { opacity: 0, scale: 3.1, duration: 0.6 }, '>0.2')
      })
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  return (
    <Root
      id="seal-flood"
      start="top top"
      end="bottom bottom"
      scrub={true}
      field={{ from: PARCHMENT, to: PARCHMENT }}
    >
      <Pin height="260vh">
        <section className="relative flex h-full items-center justify-center overflow-hidden">
          <Animation target="[data-flood-label]" start={4} end={22} fromTo={[{ y: 18, opacity: 0 }, { y: 0, opacity: 1 }]}>
            <p
              data-flood-label
              className="absolute top-[18%] font-mono text-[11px] uppercase tracking-[0.35em] field-ink-soft"
            >
              The seal of the lab · est. in open source
            </p>
          </Animation>

          <Animation
            target="[data-flood-seal]"
            start={10}
            end={72}
            fromTo={[{ scale: 1, rotate: -6 }, { scale: 16, rotate: 2, ease: 'power1.inOut' }]}
          >
            <div data-flood-seal>
              <SealMark label="Eskolx Labs seal" className="h-32 w-32" />
            </div>
          </Animation>

          {/* the stamp dissolves into its own harvest early, while the room
              is still day-lit: die first, then vine, until only the fruit
              floods the page — nothing near-black ever covers the spread */}
          <Animation target="[data-flood-seal] .seal-die" start={20} end={32} to={{ opacity: 0 }} />
          <Animation target="[data-flood-seal] .seal-vine" start={44} end={60} to={{ opacity: 0 }} />

          {/* the label lifts away as the stamp presses home */}
          <Animation target="[data-flood-label]" start={30} end={48} to={{ y: -40, opacity: 0 }} />

          {/* the emblem releases the frame once the night is set */}
          <Animation target="[data-flood-seal]" start={78} end={96} to={{ opacity: 0, scale: 19 }} />
        </section>
      </Pin>
    </Root>
  )
}
