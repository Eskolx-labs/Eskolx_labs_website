'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Root, Pin, Animation } from '@/lib/scrollytelling'
import { LOAM } from '@/lib/field-controller'
import { bindStakeLighting, scrollToPlate } from '@/lib/stakes'

const TIERS = [
  {
    id: 1,
    name: 'Foundational Statistics & Probability (from scratch)',
    concepts: ['Descriptive statistics', 'Elementary probability distributions', 'Hypothesis testing', 'Optimization of every routine'],
    goal: 'The first season. Descriptive statistics, elementary probability distributions, and hypothesis testing, written as pure Python with no black boxes. At the end of the three months, participants turn their own packages loose on novel research.',
  },
  {
    id: 2,
    name: 'Modeling & Classical Machine Learning (from scratch)',
    concepts: ['Modeling on our own packages', 'Assumption checks', 'Feature diagnostics', 'Reference comparison against the famous implementations'],
    goal: 'After the basics, modeling and classical machine learning built on what we grew ourselves. Assumption checks and test selection wired end to end, every method backed by the paper it came from.',
  },
  {
    id: 3,
    name: 'Advanced Applied Machine Learning (from scratch)',
    concepts: ['Neural networks', 'Modern architectures', 'Time series & stationarity', 'Design of Experiments'],
    goal: 'Next comes advanced data science, still from scratch. You read the papers, then write tested, documented code you can explain line by line.',
  },
  {
    id: 4,
    name: 'Toward Automated Data Science (from scratch)',
    concepts: ['Analysis pipelines', 'Spatial statistics', 'Knowledge-base-driven methods'],
    goal: 'The long game. Libraries and an open knowledge base good enough that data science starts automating itself, built by people who rebuilt the basics first.',
  },
]

// module-level so the Root's timeline effect never sees a fresh object
const TIERS_FIELD = { from: LOAM, to: LOAM }

export function ConceptTiers() {
  // which stake the rail reports as current, and which plates have framed,
  // measured from the real stack (see lib/stakes). Written straight to the
  // DOM on a rAF-throttled scroll listener: a React state here would
  // re-render the whole chapter mid-scrub, tearing down and rebuilding the
  // scrub exactly when the stakes should light.
  useEffect(() =>
    bindStakeLighting({
      rootId: 'tiers',
      stackSel: '#tiers [data-tier-stack]',
      stakeAttr: 'data-stake',
      litAttrs: ['data-tier-kicker'],
      count: TIERS.length,
      gsapScrollTrigger: ScrollTrigger,
    }), [])

  // the stack travels exactly its own scrollable height, measured — so the
  // fourth tier lands framed no matter how tall the plates run.
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference) and (min-height: 500px)', () => {
      gsap.registerPlugin(ScrollTrigger)
      const stack = document.querySelector<HTMLElement>('#tiers [data-tier-stack]')
      const frame = stack?.parentElement as HTMLElement | null
      const first = stack?.children[0] as HTMLElement | undefined
      if (!stack || !frame || !first) return
      // the window fits one plate exactly, so a third of the travel lands
      // each subsequent tier dead-center — at any viewport size
      const kids = Array.from(stack.children) as HTMLElement[]
      const fit = () => {
        // the window derives from the tallest plate — no slicing mid-heading
        // when plates run unequal — capped by the shell reserve (heading +
        // clearance) on short windows. Every plate then stretches to fill
        // the window exactly, so a reader who stops anywhere lands on a
        // complete spread, never a guillotined heading.
        const maxH = Math.max(...kids.map((k) => k.offsetHeight))
        const windowH = Math.min(
          maxH + 2,
          Math.max(Math.round(window.innerHeight - 230), 260),
        )
        frame.style.height = `${windowH}px`
        for (const k of kids) k.style.minHeight = `${windowH}px`
      }
      fit()
      ScrollTrigger.addEventListener('refreshInit', fit)
      const ctx = gsap.context(() => {
        gsap.fromTo(stack, { y: 0 }, {
          y: () => -Math.max(stack.scrollHeight - frame.clientHeight, 0),
          ease: 'none',
          scrollTrigger: {
            trigger: '#tiers [data-pin]',
            start: 'top top',
            end: () => `+=${Math.max((document.querySelector('#tiers [data-pin]') as HTMLElement).offsetHeight - window.innerHeight, 1)}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
      })
      ScrollTrigger.refresh()
      return () => {
        ScrollTrigger.removeEventListener('refreshInit', fit)
        ctx.revert()
        frame.style.height = ''
        for (const k of kids) k.style.minHeight = ''
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <>
      {/* the dusk turn: the identity chapter holds day to the end; this short
          seam carries the field into night so the trellis opens dark — the
          mirror of the dawn seam before the method */}
      <Root
        id="dusk-seam"
        className="relative flex h-[28vh] items-center justify-center bg-loam-950 md:h-[55vh]"
        start="top bottom"
        end="bottom top"
        field={{
          from: { bg: '#ece1c6', ink: '#29190c', soft: '#5c4a33', line: '#b9a67f' },
          to: LOAM,
        }}
      >
        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-wine-500/80" />
          <span className="h-1 w-1 rounded-full bg-gold-leaf/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-wine-500/80" />
        </div>
      </Root>

      <Root
        id="tiers"
        className="relative bg-loam-950"
        scrub={true}
        field={TIERS_FIELD}
        mobilePins
      >
      <Pin height="255vh" mobileHeight="170vh" pinMobile>
        <section className="relative flex h-full flex-col overflow-hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pt-16 sm:px-6 lg:px-8">
            {/* room furniture: static inside the pinned shell (see the
                guide-bar note — viewport Reveals scramble in sticky rooms) */}
            <div className="relative max-w-3xl">
              <h2 className="display text-[clamp(2rem,3.8vw,3.2rem)] leading-tight text-cream-100">
                The four-tier trellis
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream-200/80">
                Build order, not marketing tiers. Each rung trains on the last:
                statistical primitives, then modeling, then advanced methods,
                until the libraries can carry real research.
              </p>
            </div>

            {/* the phone stake strip: the rail's carrier below lg — same
                numbers, same lighting waypoints, tap-to-jump included */}
            <div className="mt-8 flex items-center justify-center gap-3 lg:hidden" role="group" aria-label="Concept tiers">
              {TIERS.map((tier, i) => (
                <button
                  key={tier.id}
                  type="button"
                  data-stake={tier.id}
                  onClick={() => scrollToPlate('tiers', '#tiers [data-tier-stack]', i, TIERS.length)}
                  aria-label={`Go to ${tier.name}`}
                  className="tabular flex h-11 w-11 items-center justify-center rounded-full border border-loam-700/70 bg-loam-900/60 font-mono text-sm text-cream-400"
                >
                  {tier.id}
                </button>
              ))}
            </div>
            <span data-strip-progress aria-hidden="true" className="mx-auto mt-3 block h-px w-28 origin-left scale-x-0 bg-gold-leaf/80 lg:hidden" />

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              {/* rail of tier stakes; the active one lights as scroll advances,
                  and each stake is a real button that jumps the pin to its tier.
                  The rail drifts at its own slower speed against the plate.
                  Below lg it would stack above the window and push the plates
                  down the page, so it yields to the plates themselves. */}
              <div
                className="hidden flex-col gap-2.5 lg:flex"
                role="group"
                aria-label="Concept tiers"
              >
                <Animation target="[data-tier-rail]" start={0} end={100} to={{ y: 14 }} />
                <div data-tier-rail className="flex flex-col gap-2.5">
                  {TIERS.map((tier, i) => (
                    <button
                      key={tier.id}
                      type="button"
                      data-stake={tier.id}
                      onClick={() => scrollToPlate('tiers', '#tiers [data-tier-stack]', i, TIERS.length)}
                      aria-label={`Jump to ${tier.name}`}
                      className="flex items-center gap-4 rounded-sm border border-loam-700/70 bg-loam-900/60 p-4 text-left transition-colors hover:border-loam-700 hover:bg-loam-850/70"
                    >
                    <span
                      data-stake-num={tier.id}
                      className="tabular flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-loam-700 font-mono text-sm text-cream-400"
                    >
                      {tier.id}
                    </span>
                    <span>
                      <span
                        data-stake-name={tier.id}
                        className="block font-serif text-copy font-medium text-cream-200/70"
                      >
                        {tier.name.replace(' (from scratch)', '')}
                      </span>
                    </span>
                   </button>
                 ))}
                </div>
              </div>

              {/* detail plate: all four bodies stacked, scrubbed through a window.
                  Below lg the window opens and the plates flow in reading order. */}
              <div
                className="plate-frame overflow-hidden rounded-sm border border-loam-700/80 bg-loam-900"
                style={{ overflow: 'clip' }}
              >
                <div data-tier-stack className="will-change-transform max-md:transform-none">
                  {TIERS.map((tier) => (
                    <div key={tier.id} className="p-7 sm:p-9">
                      <div className="rule-ornament">
                        <span data-tier-kicker={tier.id} className="font-mono text-kicker tracking-label text-gold-leaf">
                          TIER {tier.id}
                        </span>
                      </div>
                      <h3 className="display mt-5 text-2xl leading-snug text-cream-100">
                        {tier.name}
                      </h3>
                      <p className="mt-3 max-w-[65ch] leading-relaxed text-cream-200/80">{tier.goal}</p>

                      <ul className="mt-7 space-y-2.5">
                        {tier.concepts.map((c) => (
                          <li key={c} className="flex items-center gap-3 text-copy text-cream-100/90">
                            <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 shrink-0 text-wine-400" aria-hidden="true">
                              <path
                                d="M2 7.5 L5.5 11 L12 3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {c}
                          </li>
                        ))}
                      </ul>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Pin>


    </Root>
    </>
  )
}
