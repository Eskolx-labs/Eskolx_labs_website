'use client'

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
  // the pinned scrub choreographs the whole flood at every size now —
  // label set, seal swelling past the frame, die and vine dissolving into
  // the harvest. The old below-md one-shot is gone: it double-drove the
  // seal (its final opacity:0 killed the element the scrub was still
  // animating) and left phones a blank room for ~90vh of scrolling.
  return (
    <Root
      id="seal-flood"
      start="top top"
      end="bottom bottom"
      scrub={true}
      field={{ from: PARCHMENT, to: PARCHMENT }}
      mobilePins
    >
      <Pin height="260vh" mobileHeight="180vh" pinMobile>
        {/* column layout: in the pinned shell the label is absolute and the
            seal centers alone; when reduced motion collapses the room, the
            label stacks above the emblem as ordinary flow */}
        <section className="relative flex h-full flex-col items-center justify-center overflow-hidden">
          {/* the label is on stage at progress 0 — the room opens with its
              caption already set, and lifts away as the stamp presses home.
              Absolute only while motion runs: in a collapsed auto-height
              shell a top-[18%] absolute would float over the emblem. */}
          <p
            data-flood-label
            className="mb-8 font-mono text-kicker uppercase tracking-[0.35em] field-ink-soft motion-safe:absolute motion-safe:top-[18%] motion-safe:mb-0"
          >
            The seal of the lab · est. in open source
          </p>

          <Animation
            target="[data-flood-seal]"
            start={10}
            end={72}
            fromTo={[{ scale: 1, rotate: -6 }, { scale: () => (window.innerWidth < 768 ? 11 : 16), rotate: 2, ease: 'power1.inOut' }]}
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

          {/* the label lifts away BEFORE the vine grows past it */}
          <Animation target="[data-flood-label]" start={22} end={38} to={{ y: -40, opacity: 0 }} />

          {/* the emblem releases the frame once the night is set */}
          <Animation target="[data-flood-seal]" start={78} end={96} to={{ opacity: 0, scale: () => (window.innerWidth < 768 ? 13 : 19) }} />
        </section>
      </Pin>
    </Root>
  )
}
