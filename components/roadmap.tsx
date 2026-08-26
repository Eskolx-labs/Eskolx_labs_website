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
    body: 'Every function starts as reading. We work through the books and papers behind each method, record what we learn in an open Obsidian vault, then implement. Participants learn how research is done by doing it.',
    tags: ['Paper → code', 'Open notes', 'Reference comparison'],
  },
  {
    phase: 'Phase 3',
    title: 'Use what you build',
    body: 'Every milestone ends with real work: packages carried to previously unsolved problems, from the boring grind of collecting data to the final polish of a finished paper. If you cannot explain it, you have not finished it.',
    tags: ['Real datasets', 'Novel research', 'Teach it forward'],
  },
]

/*
 * The method told as one pinned, frameless spread: the room holds while
 * three phases rise onto the same open stage, one at a time — gold rule
 * first, then the whole entry settles as a unit — while the vine rail draws
 * itself past each chapter node and a quiet numeral marks your place. No
 * card, no window dressing; below md (or reduced motion) the beats simply
 * stack as an ordinary flowing section.
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
              {/* vine rail draws past the chapter nodes. Decorative only, and
                  absolute against a shell that reduced motion collapses — so
                  it exists only while motion runs. */}
              <div aria-hidden="true" className="absolute bottom-6 left-[19px] top-1 hidden w-px motion-safe:md:block">
                <Animation target="[data-vine-rail]" start={2} end={88} fromTo={[{ scaleY: 0 }, { scaleY: 1, ease: 'power1.inOut' }]}>
                  <span data-vine-rail className="block h-full w-full origin-top bg-parchment-ink/25" />
                </Animation>
                <svg viewBox="0 0 24 24" className="absolute -bottom-5 -left-[11px] h-5 w-5 text-parchment-ink/40" fill="none">
                  <path d="M12 2 C11.4 7 13.5 10 17 11 M17 11 c3-.8 4.4 1.2 3.2 3 c-1 1.5-3.2 1-3.4-.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  data-vine-node={i}
                  aria-hidden="true"
                  style={{ top: `${14 + i * 30}%` }}
                  className="absolute left-[14px] hidden h-[11px] w-[11px] rounded-full border-2 border-parchment-ink/40 bg-parchment transition-colors duration-300 motion-safe:md:block"
                />
              ))}
              {[0, 1, 2].map((i) => (
                <Waypoint
                  key={i}
                  at={i * 31 + 11}
                  tween={{
                    target: `[data-vine-node="${i}"]`,
                    to: { backgroundColor: '#963a68', borderColor: '#963a68' },
                    duration: 4,
                  }}
                />
              ))}

              {/* the reader's place: chapter numerals */}
              <div aria-hidden="true" className="absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-7 font-mono text-[13px] tracking-widest text-parchment-ink opacity-35 lg:flex">
                {PHASES.map((p, i) => (
                  <span key={p.phase} data-rm-num={i}>{`0${i + 1}`}</span>
                ))}
              </div>
              {PHASES.map((_, i) => {
                const s = i * 31
                return (
                  <Animation key={`num-in-${i}`} target={`[data-rm-num="${i}"]`} start={s + 6} end={s + 11} fromTo={[{ opacity: 0.35 }, { opacity: 1, color: '#963a68' }]} />
                )
              })}
              {[0, 1].map((i) => (
                <Animation key={`num-out-${i}`} target={`[data-rm-num="${i}"]`} start={i * 31 + 30} end={i * 31 + 35} fromTo={[{ opacity: 1, color: '#963a68' }, { opacity: 0.35, color: '#29190c', immediateRender: false }]} />
              ))}

              {/* the beats themselves */}
              <div className="grid h-full">
                {PHASES.map((p, i) => {
                  const s = i * 31
                  return (
                    <div
                      key={p.phase}
                      data-rm-beat={i}
                      className="flex flex-col justify-center py-12 md:pl-16 lg:pr-24 motion-safe:[@media(min-width:768px)_and_(min-height:700px)]:[grid-area:1/1] [@media(min-width:768px)_and_(min-height:700px)]:h-full [@media(min-width:768px)_and_(min-height:700px)]:py-0"
                    >
                      {/* phase 1 is on stage at progress 0 — the room never
                          opens on a blank spread */}
                      {i > 0 ? (
                        <Animation target={`[data-rm-rule="${i}"]`} start={s} end={s + 8} fromTo={[{ scaleX: 0 }, { scaleX: 1, ease: 'power2.out' }]}>
                          <span data-rm-rule={i} className="mb-6 block h-px w-16 origin-left bg-gold-leaf/80" />
                        </Animation>
                      ) : (
                        <span data-rm-rule={i} className="mb-6 block h-px w-16 origin-left bg-gold-leaf/80" />
                      )}
                      {i > 0 && (
                        <Animation
                          target={`[data-rm-unit="${i}"]`}
                          start={s + 2}
                          end={s + 18}
                          fromTo={[{ y: 48, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }]}
                        />
                      )}
                      <div data-rm-unit={i}>
                        <span className="tabular inline-flex items-center gap-2 rounded-full border border-wine-500/50 bg-wine-600/10 px-3.5 py-1 font-mono text-xs tracking-wide text-wine-600">
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
                              className="rounded-sm border border-parchment-ink/25 px-2.5 py-1 font-mono text-[11px] text-parchment-ink/80"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {i < 2 && (
                        <Animation
                          target={`[data-rm-unit="${i}"]`}
                          start={s + 22}
                          end={s + 29}
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
          the body holds paper until the seal floods the page into night. */}
      <Root
        className="bg-parchment"
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
          fromTo={[{ y: 28, opacity: 0 }, { y: 0, opacity: 1 }]}
        />
        <div data-exit-inner className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-5 rounded-sm border border-parchment-ink/25 bg-parchment p-7 sm:flex-row sm:items-center">
            <svg viewBox="0 0 40 40" className="h-11 w-11 shrink-0 text-gold-leaf" aria-hidden="true" fill="none">
              <path d="M8 31 H32 M10 34 H30 M13 37 H27" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
              <path d="M20 30 V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M20 22 C16.5 19.5 13.5 19.5 11 21.5 C13.5 24 17 23.8 20 22 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M20 17 C23.5 14.5 26.5 14.5 29 16.5 C26.5 19 23 18.8 20 17 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <circle cx="20" cy="12" r="1.3" fill="currentColor" stroke="none" />
            </svg>
            <div>
              <h3 className="display text-lg text-parchment-ink">Small, fast-moving builder teams</h3>
              <p className="mt-1.5 max-w-[68ch] text-[15px] leading-relaxed text-parchment-ink/75">
                Few people, fast cycles. Cohorts work in pure code and ship
                tested, documented packages instead of notebooks.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-parchment-ink/25 pt-10 sm:flex-row sm:items-center">
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
