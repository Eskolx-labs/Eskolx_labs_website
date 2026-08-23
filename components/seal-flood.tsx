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
              <SealMark label="The Eskolx Labs seal floods the page" className="h-32 w-32" />
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
