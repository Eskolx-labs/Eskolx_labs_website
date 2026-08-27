'use client'

import { Root, Pin, Animation } from '@/lib/scrollytelling'
import { PARCHMENT } from '@/lib/field-controller'
import { SealMark } from '@/components/botanical/seal-mark'

/*
 * The interlude between method and people, and our answer to
 * minimal-goods' circle-grow: pinned in a short room, the engraved seal
 * presses into the page while the field holds day steady — the zoom
 * reads as pressing the stamp into parchment, not falling into night.
 * The night turn waits for the keepers chapter past the seam.
 *
 * The press, in the book's register:
 * Beat 1 (10-36) the press comes down: the seal accelerates into the
 *   frame (power2.in) while the die wears through — the outer frame's
 *   ink squishes outward and thins as the impact lands.
 * Beat 2 (36-72) the flood: the ink spreads and the camera settles
 *   (power2.out) while the vine wears through last.
 * Beat 3 (78-96) the lift-off: the stamp pulls away with a tilt and
 *   accelerates off the page.
 * The label reads first and is pushed aside as the stamp grows past it;
 * the emblem holds a beat at full flood, then releases.
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

          {/* the press comes down: the seal accelerates into the frame,
              then the ink spreads and settles as it floods */}
          <div data-flood-seal>
            <SealMark label="Eskolx Labs seal" className="h-32 w-32" />
          </div>
          <Animation
            target="[data-flood-seal]"
            start={10}
            end={36}
            fromTo={[
              { scale: 1, rotate: -6 },
              { scale: () => (window.innerWidth < 768 ? 5.5 : 8), rotate: -1, ease: 'power2.in' },
            ]}
          />
          <Animation
            target="[data-flood-seal]"
            start={36}
            end={72}
            fromTo={[
              { scale: () => (window.innerWidth < 768 ? 5.5 : 8), rotate: -1 },
              { scale: () => (window.innerWidth < 768 ? 11 : 16), rotate: 2, ease: 'power2.out', immediateRender: false },
            ]}
          />

          {/* the stamp wears through as it presses: the die's ink squishes
              outward and thins first, then the vine — nothing near-black
              ever covers the spread */}
          <Animation target="[data-flood-seal] .seal-die" start={20} end={32} to={{ opacity: 0, scale: 1.06, ease: 'power1.in' }} />
          <Animation target="[data-flood-seal] .seal-vine" start={44} end={60} to={{ opacity: 0, scale: 1.04, ease: 'power1.in' }} />

          {/* the label is pushed aside as the stamp grows past it */}
          <Animation target="[data-flood-label]" start={22} end={38} to={{ y: -40, opacity: 0, ease: 'power2.in' }} />

          {/* the stamp lifts off once the night is set: it pulls away
              with a tilt and accelerates off the page */}
          <Animation target="[data-flood-seal]" start={78} end={96} to={{ opacity: 0, scale: () => (window.innerWidth < 768 ? 13 : 19), rotation: 4, ease: 'power1.in' }} />
        </section>
      </Pin>
    </Root>
  )
}
