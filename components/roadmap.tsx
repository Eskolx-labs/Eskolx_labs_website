'use client'

import { Root, Animation, Waypoint, Pin } from '@/lib/scrollytelling'
import { PARCHMENT, LOAM } from '@/lib/field-controller'

const PHASES = [
  {
    phase: 'Phase 1',
    title: 'Basic statistical packages, from scratch',
    body: 'Descriptive statistics, elementary probability distributions, and hypothesis testing, written as pure Python with no black boxes. At the end of the three months, participants turn their own packages loose on novel research.',
    tags: ['Descriptive stats', 'Distributions', 'Hypothesis testing', 'Optimization'],
  },
  {
    phase: 'Phase 2',
    title: 'Books and papers before every function',
    body: 'Every function starts as a question, not a subject. Why does the Student t-distribution have heavier tails? You chase it through books and papers, write the mathematics, build the naive version, test it, and compare your numbers against the famous implementations until they agree. Notes land in the open vault before code lands in the library.',
    tags: ['Paper → code', 'Open notes', 'Reference comparison'],
  },
  {
    phase: 'Phase 3',
    title: 'Use what you build',
    body: 'Every milestone ends with real work: packages carried to previously unsolved problems, from the boring grind of collecting data to the final polish of a finished paper. If you cannot explain it, you have not finished it.',
    tags: ['Real datasets', 'Novel research', 'Teach it forward'],
  },
]

// the vine grows 2-88 at linear speed; the growth tip passes the three
// nodes at the beats below (measured against the rail's real geometry:
// 15/42/69 at 1440x900, 15/42/70 at 1024x768, 15/43/70 at 768x700 — the
// nodes sit at fixed fractions of the rail, so the passes hold). Each
// node pops as the tip passes it — the lighting is caused by the vine,
// not a color lerp on a schedule.
const VINE_PASS = [15, 42, 69]

/*
 * The method told as one pinned, frameless spread: the room holds while
 * three phases rise onto the same open stage, one at a time.
 *
 * The performance, in the book's register:
 * The vine grows as its own linear draw (2-88) with a wine tip riding
 * the leading edge; each node pops as the tip passes it, so the lighting
 * is caused by the vine, not a color lerp on a schedule. Each phase
 * rises as its node pops (the rule draws, the unit lands with
 * power3.out), holds while the vine climbs to the next, and hands the
 * stage with a slight lift. The numerals slide along the rail with the
 * reading, and the quiet exit rises as it enters.
 *
 * Below md (or reduced motion) the beats simply stack as an ordinary
 * flowing section.
 */
export function Roadmap() {
  return (
    <>
      {/* the dawn turn: the trellis chapter holds night to the end; this
          short seam carries the field back to day so the method opens on
          paper without ever bleaching the tiers mid-read */}
      <Root
        id="dawn-seam"
        className="relative flex h-[28vh] items-center justify-center bg-loam-950 md:h-[55vh]"
        start="top bottom"
        end="bottom top"
        field={{
          from: LOAM,
          to: PARCHMENT,
        }}
      >
        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="h-1 w-1 rounded-full bg-gold-leaf/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-wine-500/80" />
          <span className="h-1 w-1 rounded-full bg-gold-leaf/70" />
        </div>
      </Root>

      <Root
        id="roadmap"
        className="relative bg-parchment"
        field={{
          from: { bg: '#ece1c6', ink: '#29190c', soft: '#5c4a33', line: '#b9a67f' },
          to: { bg: '#ece1c6', ink: '#29190c', soft: '#5c4a33', line: '#b9a67f' },
        }}
      >
        <Pin height="320vh">
          <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pb-10 pt-20 sm:px-6 lg:px-8">
            {/* room furniture: static inside the pinned shell (a viewport
                Reveal measured in a sticky room scrambles on resize) */}
            <div className="max-w-3xl">
              <h2 className="display text-[clamp(2rem,3.8vw,3.2rem)] leading-tight text-parchment-ink">
                The growing method
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-parchment-ink/75">
                Three months to statistical packages built from scratch, then
                research with your own tools. The plan, unedited.
              </p>
            </div>

            {/* the open stage: three beats share one place, no frame */}
            <div className="relative mt-8 min-h-0 flex-1 md:mt-10">
              {/* vine rail draws past the chapter nodes, a wine tip riding
                  its leading edge. Decorative only, and absolute against a
                  shell that reduced motion collapses — so it exists only
                  while motion runs. */}
              <div aria-hidden="true" className="absolute bottom-6 left-[19px] top-1 hidden w-px motion-safe:md:block">
                <Animation target="[data-vine-rail]" start={2} end={88} fromTo={[{ scaleY: 0 }, { scaleY: 1 }]}>
                  <span data-vine-rail className="block h-full w-full origin-top bg-parchment-ink/25" />
                </Animation>
                {/* the growth tip: rides the vine's leading edge as it
                    grows, so the eye follows the point of growth */}
                <Animation
                  target="[data-vine-tip]"
                  start={2}
                  end={88}
                  fromTo={[
                    { y: 0 },
                    { y: () => Math.max(((document.querySelector('[data-vine-rail]') as HTMLElement | null)?.offsetHeight ?? 0) - 10, 0) },
                  ]}
                >
                  <span data-vine-tip className="absolute top-0 block h-2.5 w-2.5 rounded-full bg-wine-500" style={{ left: '-5px' }} />
                </Animation>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="absolute -bottom-5 -left-[11px] h-5 w-5 text-parchment-ink/40" fill="none">
                  <path d="M12 2 C11.4 7 13.5 10 17 11 M17 11 c3-.8 4.4 1.2 3.2 3 c-1 1.5-3.2 1-3.4-.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  data-vine-node={i}
                  aria-hidden="true"
                  style={{ top: `${14 + i * 30}%` }}
                  className="absolute left-[14px] hidden h-[11px] w-[11px] rounded-full border-2 border-parchment-ink/40 bg-parchment motion-safe:md:block"
                />
              ))}
              {[0, 1, 2].map((i) => (
                <Waypoint
                  key={i}
                  at={VINE_PASS[i]}
                  tween={{
                    target: `[data-vine-node="${i}"]`,
                    fromTo: [
                      { scale: 1, backgroundColor: '#ece1c6', borderColor: 'rgba(41,25,12,0.4)' },
                      { scale: 1.55, backgroundColor: '#963a68', borderColor: '#963a68', duration: 2.5, ease: 'back.out(2)', immediateRender: false },
                    ],
                  }}
                />
              ))}
              {[0, 1, 2].map((i) => (
                <Waypoint
                  key={`settle-${i}`}
                  at={VINE_PASS[i] + 2.5}
                  tween={{
                    target: `[data-vine-node="${i}"]`,
                    to: { scale: 1, duration: 2, ease: 'power2.out', immediateRender: false },
                  }}
                />
              ))}

              {/* the reader's place: chapter numerals slide along the rail
                  as the reading advances, a cursor on the spine */}
              <div aria-hidden="true" className="absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-7 font-mono text-sm tracking-widest text-parchment-ink/70 lg:flex">
                {PHASES.map((p, i) => (
                  <span key={p.phase} data-rm-num={i}>{`0${i + 1}`}</span>
                ))}
              </div>
              {PHASES.map((_, i) => (
                <Animation key={`num-in-${i}`} target={`[data-rm-num="${i}"]`} start={VINE_PASS[i]} end={VINE_PASS[i] + 6} fromTo={[{ opacity: 0.35, x: 14 }, { opacity: 1, x: 0, color: '#963a68', ease: 'power3.out' }]} />
              ))}
              {[0, 1].map((i) => (
                <Animation key={`num-out-${i}`} target={`[data-rm-num="${i}"]`} start={VINE_PASS[i] + 21} end={VINE_PASS[i] + 27} fromTo={[{ opacity: 1, color: '#963a68' }, { opacity: 0.35, x: -14, color: '#29190c', ease: 'power2.in', immediateRender: false }]} />
              ))}

              {/* the beats themselves */}
              <div className="grid h-full">
                {PHASES.map((p, i) => {
                  const s = VINE_PASS[i]
                  return (
                    <div
                      key={p.phase}
                      data-rm-beat={i}
                      className="flex flex-col justify-center py-12 md:pl-16 lg:pr-24 motion-safe:[@media(min-width:768px)_and_(min-height:700px)]:[grid-area:1/1] [@media(min-width:768px)_and_(min-height:700px)]:h-full [@media(min-width:768px)_and_(min-height:700px)]:py-0"
                    >
                      {/* phase 1 is on stage at progress 0 — the room never
                          opens on a blank spread */}
                      {i > 0 ? (
                        <Animation target={`[data-rm-rule="${i}"]`} start={s} end={s + 5} fromTo={[{ scaleX: 0 }, { scaleX: 1, ease: 'power2.out' }]}>
                          <span data-rm-rule={i} className="mb-6 block h-px w-16 origin-left bg-gold-leaf/80" />
                        </Animation>
                      ) : (
                        <span data-rm-rule={i} className="mb-6 block h-px w-16 origin-left bg-gold-leaf/80" />
                      )}
                      {/* the dash is a chapter-begin cue: it draws in as
                          its phase rises and draws back out as the phase
                          hands the stage — one live dash at any moment,
                          never a graveyard of marks (the nodes on the vine
                          stay lit; they are the history, the dash is the
                          here-and-now) */}
                      <Animation target={`[data-rm-rule="${i}"]`} start={s + 20} end={s + 26} fromTo={[{ scaleX: 1 }, { scaleX: 0, ease: 'power1.in', immediateRender: false }]} />
                      {i > 0 && (
                        <Animation
                          target={`[data-rm-unit="${i}"]`}
                          start={s + 2}
                          end={s + 16}
                          fromTo={[{ y: 48, opacity: 0, scale: 0.985 }, { y: 0, opacity: 1, scale: 1, ease: 'power3.out' }]}
                        />
                      )}
                      <div data-rm-unit={i}>
                        <span className="tabular inline-flex items-center gap-2 rounded-full border border-wine-500/50 bg-wine-600/10 px-3.5 py-1 font-mono text-kicker tracking-label text-wine-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-wine-500" />
                          {p.phase}
                        </span>
                        <h3 className="display mt-6 max-w-3xl text-3xl leading-[1.08] text-parchment-ink md:text-4xl">
                          {p.title}
                        </h3>
                        <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-parchment-ink/75 md:text-lg">
                          {p.body}
                        </p>
                        <ul className="mt-7 flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <li
                              key={t}
                              className="rounded-sm border border-parchment-ink/25 px-2.5 py-1 font-mono text-kicker text-parchment-ink/80"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {i < 2 && (
                        <Animation
                          target={`[data-rm-unit="${i}"]`}
                          start={s + 20}
                          end={s + 26}
                          fromTo={[{ y: 0, opacity: 1 }, { y: -26, opacity: 0, ease: 'power1.in', immediateRender: false }]}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Pin>
      </Root>

      {/* the quiet exit on the day-spread. It owns its own parchment zone so
          the body holds paper until the seal floods the page into night.
          Flow-chapter strings are load-bearing here: with the default
          pinned-style start/end this shorter-than-viewport zone computed a
          zero-length trigger and its content never revealed at all. */}
      <Root
        className="bg-parchment"
        start="top bottom"
        end="bottom top"
        field={{
          from: { bg: '#ece1c6', ink: '#29190c', soft: '#5c4a33', line: '#b9a67f' },
          to: { bg: '#ece1c6', ink: '#29190c', soft: '#5c4a33', line: '#b9a67f' },
        }}
      >
        {/* the exit rises as it enters, so the room's tail pays for itself */}
        <Animation
          target="[data-exit-inner]"
          start={8}
          end={55}
          fromTo={[{ y: 28, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }]}
        />
        <div data-exit-inner className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-5 border-t border-parchment-ink/25 pt-10 sm:flex-row sm:items-center">
            <p className="display text-xl leading-snug text-parchment-ink sm:text-2xl">
              The season starts at the repo.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/eskolx-labs"
                target="_blank"
                rel="noreferrer"
                className="btn-plate btn-wine !py-2.5"
              >
                Start with the seed repo
              </a>
              <a
                href="https://t.me/eskolx_labs"
                target="_blank"
                rel="noreferrer"
                className="btn-plate btn-outline !py-2.5"
              >
                Talk to a builder
              </a>
            </div>
          </div>
        </div>
      </Root>
    </>
  )
}
