'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Root, Pin, Animation, Waypoint } from '@/lib/scrollytelling'
import { LOAM } from '@/lib/field-controller'
import { Reveal } from '@/components/reveal'

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
    concepts: ['Modeling on our own primitives', 'Assumption checks', 'Feature diagnostics', 'Reference comparison against the famous implementations'],
    goal: 'After the basics, modeling and classical machine learning built on what we grew ourselves. Assumption checks and test selection wired end to end, every method backed by the paper it came from.',
  },
  {
    id: 3,
    name: 'Advanced Applied Machine Learning (from scratch)',
    concepts: ['Neural networks', 'Modern architectures', 'Time series & stationarity', 'Design of Experiments'],
    goal: 'Advanced data science next, still from scratch. Dense methodology enters as reading and leaves as tested, documented code that participants can explain line by line.',
  },
  {
    id: 4,
    name: 'Toward Automated Data Science (from scratch)',
    concepts: ['Analysis pipelines', 'Spatial statistics', 'Knowledge-base-driven methods'],
    goal: 'The long game. Libraries and an open knowledge base good enough that data science starts automating itself, built by people who rebuilt the basics first.',
  },
]

const STAKE_AT = [0, 25, 50, 75]
// module-level so the Root's timeline effect never sees a fresh object
const TIERS_FIELD = { from: LOAM, to: LOAM }
/* the scroll fraction where each tier's plate is fully framed in the pin:
   the stack travels -75% over the room, so plate i frames at i/3 of it */
const TIER_FRAME_AT = [0, 33.33, 66.67, 100]

/* each tier fills a quarter of the pinned window; jumping to its top means
   scrolling to the section top plus the tier's quarter OF THE SCRUBBED ROOM
   (spacer height minus viewport — the pin's true active range). Honors Lenis
   when present. */
function jumpToTier(index: number) {
  const el = document.getElementById('tiers')
  if (!el) return
  const fraction = TIER_FRAME_AT[index] / 100
  const pin = el.querySelector('[data-pin]')
  const room = pin ? pin.getBoundingClientRect().height - window.innerHeight : 0
  const target = el.getBoundingClientRect().top + window.scrollY + Math.max(room, 0) * fraction
  const lenis = (window as Window & { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4 })
  } else {
    window.scrollTo({ top: target, behavior: 'smooth' })
  }
}

export function ConceptTiers() {
  // which stake the rail reports as current, for assistive tech. Written
  // straight to the DOM on a rAF-throttled scroll listener: a React state
  // here would re-render the whole chapter mid-scrub, tearing down and
  // rebuilding every Waypoint tween exactly when the stakes should light.
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const el = document.getElementById('tiers')
        if (!el) return
        const pin = el.querySelector<HTMLElement>('[data-pin]')
        const room = pin ? pin.offsetHeight - window.innerHeight : 1
        const progress = Math.min(Math.max(-el.getBoundingClientRect().top / Math.max(room, 1), 0), 1)
        const current = Math.min(TIERS.length, Math.floor(progress * TIERS.length) + 1)
        el.querySelectorAll<HTMLButtonElement>('[data-stake]').forEach((btn) => {
          const id = Number(btn.getAttribute('data-stake'))
          if (id === current) btn.setAttribute('aria-current', 'true')
          else btn.removeAttribute('aria-current')
        })
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // the stack travels exactly its own scrollable height, measured — so the
  // fourth tier lands framed no matter how tall the plates run.
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference) and (min-height: 700px)', () => {
      gsap.registerPlugin(ScrollTrigger)
      const stack = document.querySelector<HTMLElement>('#tiers [data-tier-stack]')
      const frame = stack?.parentElement as HTMLElement | null
      const first = stack?.children[0] as HTMLElement | undefined
      if (!stack || !frame || !first) return
      // the window fits one plate exactly, so a third of the travel lands
      // each subsequent tier dead-center — at any viewport size
      const fit = () => {
        // the window prefers one plate exactly, but a plate taller than ~78vh
        // would clip against the sticky shell — the cap trades a little of the
        // stage for never cutting copy off
        frame.style.height = `${Math.min(first.offsetHeight + 2, Math.round(window.innerHeight * 0.78))}px`
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
      <Pin height="420vh" mobileHeight="240vh" pinMobile>
        <section className="relative flex h-full flex-col overflow-hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pt-16 sm:px-6 lg:px-8">
            <Reveal className="relative max-w-3xl" y={26}>
              <h2 className="display text-[clamp(2rem,3.8vw,3.2rem)] leading-tight text-cream-100" data-reveal-item>
                The four-tier trellis
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream-200/80">
                Build order, not marketing tiers. Each rung trains on the last:
                statistical primitives, then modeling, then advanced methods,
                until the libraries can carry real research.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
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
                      onClick={() => jumpToTier(i)}
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
                        className="block font-serif text-[15px] font-medium text-cream-200/70"
                      >
                        {tier.name}
                      </span>
                    </span>
                   </button>
                 ))}
                </div>
              </div>

              {/* detail plate: all four bodies stacked, scrubbed through a window.
                  Below lg the window opens and the plates flow in reading order. */}
              <div className="plate-frame overflow-hidden rounded-sm border border-loam-700/80 bg-loam-900">
                <div data-tier-stack className="will-change-transform max-md:transform-none">
                  {TIERS.map((tier) => (
                    <div key={tier.id} className="p-7 sm:p-9">
                      <div className="rule-ornament">
                        <span className="font-mono text-xs tracking-[0.18em] text-gold-leaf">
                          TIER {tier.id}
                        </span>
                      </div>
                      <h3 className="display mt-5 text-2xl leading-snug text-cream-100">
                        {tier.name}
                      </h3>
                      <p className="mt-3 max-w-[65ch] leading-relaxed text-cream-200/80">{tier.goal}</p>

                      <ul className="mt-7 space-y-2.5">
                        {tier.concepts.map((c) => (
                          <li key={c} className="flex items-center gap-3 text-[15px] text-cream-100/90">
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


      {/* each tier lights its stake as it arrives */}
      {TIERS.map((tier, i) => (
        <Waypoint
          key={tier.id}
          at={STAKE_AT[i]}
          tween={{
            target: `[data-stake="${tier.id}"]`,
            to: {
              borderColor: 'rgba(176,90,129,0.6)',
              backgroundColor: 'rgba(56,36,18,0.9)',
            },
            duration: 0.3,
          }}
        />
      ))}
      {TIERS.map((tier, i) => (
        <Waypoint
          key={`num-${tier.id}`}
          at={STAKE_AT[i]}
          tween={{
            target: `[data-stake-num="${tier.id}"]`,
            to: {
              borderColor: '#b05a81',
              backgroundColor: '#7c2c54',
              color: '#f0e4c8',
            },
            duration: 0.3,
          }}
        />
      ))}
      {TIERS.map((tier, i) => (
        <Waypoint
          key={`name-${tier.id}`}
          at={STAKE_AT[i]}
          tween={{
            target: `[data-stake-name="${tier.id}"]`,
            to: { color: '#f0e4c8' },
            duration: 0.3,
          }}
        />
      ))}
    </Root>
    </>
  )
}
