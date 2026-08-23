'use client'

import { Root, Pin, Animation, Waypoint } from '@/lib/scrollytelling'
import { Reveal } from '@/components/reveal'

const PHASES = [
  {
    phase: 'Phase 1',
    title: 'Basic Statistical Packages from Scratch',
    body: 'Descriptive statistics, probability distributions, and hypothesis-testing engines written as pure Python. No black boxes, every formula implemented and tested.',
    tags: ['Descriptive Stats', 'Distributions', 'Hypothesis Testing'],
  },
  {
    phase: 'Phase 2',
    title: 'Literature & Research Driven Code',
    body: 'Academic papers and textbooks translated into reproducible Python libraries. Dense methodology becomes clean, documented, importable modules.',
    tags: ['Paper → Code', 'Reproducibility', 'Peer Review'],
  },
  {
    phase: 'Phase 3',
    title: 'Novel Real-World Research & Application',
    body: 'Custom-built packages deployed on unsolved real-world datasets, validating the ecosystem against problems with no off-the-shelf solution.',
    tags: ['Applied Research', 'Deployment', 'Open Datasets'],
  },
]

/*
 * The three phases page through one window the size of the method itself:
 * each phase fills the window (h-full cards in a 64vh frame), so at any
 * moment exactly one phase is on the page and the scrub turns the next
 * one in. The pin's timeline ends at release (the Root wraps only the
 * Pin), so the last quarter of the room is choreographed, never dead.
 */
export function Roadmap() {
  return (
    <>
      <Root
        id="roadmap"
        className="relative bg-parchment"
        scrub={true}
        field={{
          from: { bg: '#241407', ink: '#f0e4c8', soft: '#b8a284', line: '#5a4227' },
          to: { bg: '#ece1c6', ink: '#29190c', soft: '#5c4a33', line: '#b9a67f' },
        }}
      >
        <Pin height="360vh">
          <section className="relative flex h-full flex-col overflow-hidden">
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 sm:px-6 lg:px-8">
              <Reveal className="max-w-3xl">
                <h2 className="display text-[clamp(2rem,3.8vw,3.2rem)] leading-tight text-parchment-ink" data-reveal-item>
                  A three-month growing method
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-parchment-ink/75" data-reveal-item>
                  A high-velocity path from statistical primitives to novel applied
                  research, shipped as open-source packages.
                </p>
              </Reveal>

              {/* the three phases page through one window: one phase per view.
                  Below lg the window opens and the phases flow in reading order. */}
              <div className="mt-8 md:h-[64vh] overflow-hidden rounded-sm border border-parchment-ink/25 bg-parchment shadow-[0_24px_60px_-30px_rgb(0_0_0/0.35)] max-md:overflow-visible max-md:shadow-none">
                <div data-phase-stack className="will-change-transform max-md:transform-none">
                  {PHASES.map((p) => (
                    <div
                      key={p.phase}
                      className="flex md:h-[64vh] flex-col justify-center p-8 sm:p-10 max-md:h-auto"
                    >
                      <span className="tabular inline-flex items-center gap-2 rounded-full border border-wine-500/50 bg-wine-600/10 px-3 py-1 font-mono text-xs tracking-wide text-wine-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-wine-500" />
                        {p.phase}
                      </span>
                      <h3 className="display mt-5 max-w-2xl text-2xl leading-snug text-parchment-ink">
                        {p.title}
                      </h3>
                      <p className="mt-3.5 max-w-2xl text-[15px] leading-relaxed text-parchment-ink/75">
                        {p.body}
                      </p>
                      <ul className="mt-6 flex flex-wrap gap-2">
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
                  ))}
                </div>
              </div>

              {/* the method's three turns, lit as the pages turn */}
              <div className="mt-6 flex items-center justify-center gap-3" aria-hidden="true">
                {PHASES.map((p, i) => (
                  <span
                    key={p.phase}
                    data-phase-dot={i + 1}
                    className="h-2.5 w-2.5 rounded-full border border-parchment-ink/40 bg-transparent"
                  />
                ))}
              </div>
            </div>
          </section>
        </Pin>

        {/* the stack turns exactly two pages over the pin's own window */}
        <Animation target="[data-phase-stack]" start={0} end={100} to={{ yPercent: -66.67 }} />
        {PHASES.map((p, i) => (
          <Waypoint
            key={p.phase}
            at={i * 50}
            tween={{
              target: `[data-phase-dot="${i + 1}"]`,
              to: { backgroundColor: '#7c2c54', borderColor: '#7c2c54' },
              duration: 8,
            }}
          />
        ))}
      </Root>

      {/* after the pin: the quiet exit on the day-spread. It owns its own
          parchment zone so the body holds paper until leadership arrives,
          instead of leaking loam across the panel. */}
      <Root
        className="bg-parchment"
        field={{
          from: { bg: '#ece1c6', ink: '#29190c', soft: '#5c4a33', line: '#b9a67f' },
          to: { bg: '#ece1c6', ink: '#29190c', soft: '#5c4a33', line: '#b9a67f' },
        }}
      >
        {/* the exit rises as the pin releases, so the room's tail pays for itself */}
        <Animation
          target="[data-exit-inner]"
          start={8}
          end={55}
          fromTo={[{ y: 28, opacity: 0 }, { y: 0, opacity: 1 }]}
        />
        <div data-exit-inner className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-5 rounded-sm border border-parchment-ink/25 bg-parchment p-7 sm:flex-row sm:items-center">
            <svg viewBox="0 0 40 40" className="h-11 w-11 shrink-0 text-gold-leaf" aria-hidden="true" fill="none">
              <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1.4" />
              <path
                d="M20 30 V13 M20 17 C17.5 14.5 14 14 11.5 15.5 M20 21 C22.5 18.5 26 18 28.5 19.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <div>
              <h3 className="display text-lg text-parchment-ink">Small, fast-moving builder teams</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-parchment-ink/75">
                High-velocity cohorts working in pure code, shipping tested,
                documented packages instead of notebooks.
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
