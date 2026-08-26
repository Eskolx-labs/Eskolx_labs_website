'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Root, Pin, Animation, Waypoint } from '@/lib/scrollytelling'
import { PARCHMENT, LOAM } from '@/lib/field-controller'
import { Reveal } from '@/components/reveal'
import { SealMark } from '@/components/botanical/seal-mark'

const DOES = [
  'Build statistical and data-science libraries from scratch, in pure Python',
  'Read the books and papers behind every method before writing a line',
  'Publish everything under MIT, including the study notes',
  'Use our own packages on real, unsolved problems',
]

const DONTs = [
  {
    t: 'Serve as your first Python tutorial',
    d: 'Arrive knowing the basics. We start at real problems, not at print statements.',
  },
  {
    t: 'Promise financial reward',
    d: 'Maybe someday, not today. What you leave with is skill, shipped work, and your name on public commits.',
  },
  {
    t: 'Ban AI',
    d: 'Build with it if you like. You will explain every line and understand everything you shipped.',
  },
]

const REQUIREMENTS: {
  n: string
  title: string
  body: string
  href?: string
  linkText?: string
  after?: string
}[] = [
  {
    n: '01',
    title: 'Working Python',
    body: 'You do not need to be senior. You do need to read and write it without hand-holding.',
  },
  {
    n: '02',
    title: 'Patience for sources',
    body: 'Every function starts as a book chapter or a paper. If that sounds tedious, this is not your lab.',
  },
  {
    n: '03',
    title: 'Small-team pace',
    body: 'Few people, fast cycles, real milestones. Everyone ships.',
  },
  {
    n: '04',
    title: 'Teaching instinct',
    body: 'The loop ends when you can explain what you built. Explanations worth publishing go into',
    linkText: 'the open study vault',
    href: 'https://github.com/Eskolx-labs/Eskolx-Open-Knowledge',
    after: '.',
  },
]

const STATUS = [
  { k: 'Status', v: 'Actively maintained.' },
  { k: 'Code', v: 'github.com/eskolx-labs', href: 'https://github.com/eskolx-labs' },
  {
    k: 'Current goal',
    v: 'Three months, basic statistical packages: descriptive statistics, elementary probability distributions, hypothesis testing, and the optimization of each.',
  },
  {
    k: 'Releases',
    v: 'Cut when a package milestone closes. The statistical basics land first.',
  },
  { k: 'License', v: 'MIT. Everything public.' },
]

const FAQ: {
  q: string
  a: string
  href?: string
  linkText?: string
  after?: string
}[] = [
  {
    q: 'Who is Eskolx Labs for?',
    a: 'Anyone interested in statistics or data science who would rather build than watch. Most of our people are students who feel the jump from coursework to real open source is too wide. It is. We build the middle step.',
  },
  {
    q: 'Why rebuild libraries that already exist?',
    a: 'Using a library and understanding one are different skills. Ours start naive, get compared against the famous implementations, and improve until they are more than usable. That comparison is the curriculum.',
  },
  {
    q: 'How technical is this, really?',
    a: 'Serious but not gatekept. You need working Python and the statistics you have met in class. The hard parts arrive as projects, not prerequisites.',
  },
  {
    q: 'Is it free?',
    a: 'Yes. The code is MIT licensed, the study vault downloads for free, and nobody pays tuition.',
  },
  {
    q: 'Where does the material come from?',
    a: 'Books and research papers. Participants take notes before implementing anything, and those notes live in an',
    linkText: 'open Obsidian vault',
    href: 'https://github.com/Eskolx-labs/Eskolx-Open-Knowledge',
    after: ' anyone can download. Explanations good enough for the public end up on this site.',
  },
  {
    q: 'Is there a longer FAQ?',
    a: 'Not yet. This one stays short on purpose. Until the expanded version ships, ask us directly on Telegram or by email.',
  },
]

// plates on the turning field: surfaces tint from the field vars, so a
// plate is parchment-papered at the top of the turn and loam-dark by its
// end while ink and background move together and contrast never drops
const FIELD_PLATE =
  'border-[color-mix(in_srgb,var(--field-line)_70%,transparent)] bg-[color-mix(in_srgb,var(--field-bg)_88%,transparent)]'

/*
 * The practicalities spread, in three movements. The covenant (what we do
 * and don't) holds the day field — decisions read in plain ink on paper.
 * The bar pins: the four requirements frame one by one while the field
 * turns to night across the pin, ink and loam lerping together. The ledger
 * and the FAQ read on night to the close of the book.
 */
export function FieldGuide() {
  // the bar's plate stack travels its own scrollable height inside the
  // window, measured — the tiers-stack grammar, one room later in the book
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference) and (min-height: 500px)', () => {
      gsap.registerPlugin(ScrollTrigger)
      const stack = document.querySelector<HTMLElement>('#guide-bar [data-bar-stack]')
      const frame = stack?.parentElement as HTMLElement | null
      const first = stack?.children[0] as HTMLElement | undefined
      if (!stack || !frame || !first) return
      const fit = () => {
        // the window derives from the plate — one plate exactly, no slicing
        // mid-heading. The shell reserve (heading + hacktivation) is a
        // ceiling for short windows, never the target.
        frame.style.height = `${Math.min(
          first.offsetHeight + 2,
          Math.max(Math.round(window.innerHeight - 300), 260),
        )}px`
      }
      fit()
      ScrollTrigger.addEventListener('refreshInit', fit)
      const ctx = gsap.context(() => {
        gsap.fromTo(stack, { y: 0 }, {
          y: () => -Math.max(stack.scrollHeight - frame.clientHeight, 0),
          ease: 'none',
          scrollTrigger: {
            trigger: '#guide-bar [data-pin]',
            start: 'top top',
            end: () => `+=${Math.max((document.querySelector('#guide-bar [data-pin]') as HTMLElement).offsetHeight - window.innerHeight, 1)}`,
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
      {/* movement one: the covenant, on the day spread */}
      <Root
        id="fieldguide"
        className="relative bg-parchment pt-24"
        start="top bottom"
        end="bottom top"
        field={{ from: PARCHMENT, to: PARCHMENT }}
      >
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <Animation target="[data-fg-head]" start={2} end={62} to={{ y: -26 }} />
          <Animation target="[data-fg-seal]" start={3} end={9} fromTo={[{ scale: 1.35, rotate: -12, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, rotate: -6, opacity: 1, ease: 'power4.in' }]} />
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl" data-fg-head>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-wine-600" data-reveal-item>
                The field guide
              </p>
              <h2 className="display mt-4 text-[clamp(2rem,3.8vw,3.2rem)] leading-tight text-parchment-ink" data-reveal-item>
                Practicalities, in plain ink
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-parchment-ink/75" data-reveal-item>
                How to join, how we work, where the project stands. No sales copy,
                just the answers.
              </p>
            </div>
            {/* the wrapper reserves the layout box so the seal's entrance
                swell (scale 1.8) grows symmetrically instead of pushing the
                document edge out by 15px on tablet widths */}
            <span className="grid h-14 w-14 shrink-0 place-items-center sm:h-16 sm:w-16">
              <SealMark label="Eskolx Labs seal" data-fg-seal className="h-14 w-14 -rotate-6 sm:h-16 sm:w-16" />
            </span>
          </Reveal>

          <Animation target='[data-fg-wipe="0"]' start={12} end={24} fromTo={[{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'power2.inOut' }]} />
          <Animation target='[data-fg-wipe="1"]' start={22} end={34} fromTo={[{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'power2.inOut' }]} />
          <Reveal className="mt-14 grid gap-px overflow-hidden rounded-sm border border-parchment-ink/20 bg-parchment-ink/15 md:grid-cols-2" y={24}>
            <div data-fg-wipe="0" className="bg-parchment p-7 sm:p-9">
              <h3 className="display text-xl text-parchment-ink">What we do</h3>
              <ul className="mt-6 space-y-4">
                {DOES.map((d) => (
                  <li key={d} className="flex gap-3.5 text-[15px] max-md:text-base leading-relaxed text-parchment-ink/85">
                    <svg viewBox="0 0 14 14" className="mt-1 h-3.5 w-3.5 shrink-0 text-wine-600" aria-hidden="true">
                      <path d="M2 7.5 L5.5 11 L12 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div data-fg-wipe="1" className="bg-parchment p-7 sm:p-9">
              <h3 className="display text-xl text-parchment-ink">What we don&apos;t</h3>
              <ul className="mt-6 space-y-5">
                {DONTs.map((d) => (
                  <li key={d.t} className="flex gap-3.5">
                    <svg viewBox="0 0 14 14" className="mt-1 h-3.5 w-3.5 shrink-0 text-wine-600" aria-hidden="true">
                      <path d="M3 3 L11 11 M11 3 L3 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>
                      <span className="block text-[15px] max-md:text-base font-medium leading-relaxed text-parchment-ink/85">{d.t}</span>
                      <span className="mt-1 block max-w-[52ch] text-[15px] max-md:text-base leading-relaxed text-parchment-ink/70">{d.d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Root>

      {/* the guide's own dusk: the covenant holds day to its end; this short
          transparent crossing carries the field into night BEFORE any text
          arrives — ink and loam never lerp mid-paragraph, because lerp them
          together and they cross at unreadable contrast */}
      <Root
        id="guide-dusk"
        className="relative flex h-[30vh] items-center justify-center md:h-[45vh]"
        start="top bottom"
        end="bottom top"
        field={{ from: PARCHMENT, to: LOAM }}
      >
        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-wine-500/80" />
          <span className="h-1 w-1 rounded-full bg-gold-leaf/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-wine-500/80" />
        </div>
      </Root>

      {/* movement two: the bar. Night holds for the whole pin — the four
          requirements frame one by one; the stack is the tiers grammar, and
          each plate lights as it takes the window. */}
      <Root
        id="guide-bar"
        start="top top"
        end="bottom bottom"
        field={{ from: LOAM, to: LOAM }}
        mobilePins
      >
        <Pin height="300vh" mobileHeight="220vh" pinMobile>
          <section className="relative flex h-full flex-col justify-center overflow-hidden px-0 pt-20">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* room furniture: static, never a viewport Reveal — a Reveal
              measured inside a sticky shell bakes in whatever position the
              shell was stuck at during the last refresh, and the heading's
              reveal window lands at the pin's end */}
          <div className="max-w-3xl">
            <h2 className="display text-[clamp(2rem,3.8vw,3.2rem)] leading-tight field-ink">
              What it takes to join
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed field-ink-soft">
              The mission sets the bar. Here it is, plainly — four things,
              no hidden fifth.
            </p>
          </div>

              <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                {/* the stack: one plate fills the window at a time */}
                <div
                  data-bar-frame
                  className="plate-frame overflow-hidden rounded-sm border border-[color-mix(in_srgb,var(--field-line)_70%,transparent)]"
                  style={{ overflow: 'clip' }}
                >
                  <div data-bar-stack>
                    {REQUIREMENTS.map((r) => (
                      <article
                        key={r.n}
                        data-bar-plate={r.n}
                        className={`flex min-h-[280px] flex-col justify-center p-8 sm:p-10 ${FIELD_PLATE} [@media(min-width:768px)_and_(max-height:699px)]:min-h-0 [@media(min-width:768px)_and_(max-height:699px)]:p-6`}
                      >
                        <span
                          data-bar-num={r.n}
                          className="tabular inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--field-line)_90%,transparent)] font-mono text-sm field-ink-soft"
                        >
                          {r.n}
                        </span>
                        <h3 className="display mt-5 text-2xl leading-snug field-ink sm:text-3xl">
                          {r.title}
                        </h3>
                        <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-[color-mix(in_srgb,var(--field-ink)_80%,transparent)]">
                          {r.body}
                          {r.href && (
                            <>
                              {' '}
                              <a href={r.href} target="_blank" rel="noreferrer" className="text-wine-400 underline decoration-gold-leaf/40 underline-offset-4 transition-colors hover:text-wine-300">
                                {r.linkText}
                              </a>
                              {r.after}
                            </>
                          )}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>

                {/* the rail: four stakes, one per plate, lighting as the
                    stack frames them — the trellis rail, restated */}
                <div className="hidden flex-col gap-3 lg:flex" role="group" aria-label="Joining requirements">
                  {REQUIREMENTS.map((r) => (
                    <div
                      key={r.n}
                      data-bar-stake={r.n}
                      className="flex items-center gap-4 rounded-sm border border-[color-mix(in_srgb,var(--field-line)_50%,transparent)] p-4"
                    >
                      <span
                        data-bar-stake-num={r.n}
                        className="tabular flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--field-line)_90%,transparent)] font-mono text-sm field-ink-soft"
                      >
                        {r.n}
                      </span>
                      <span className="font-serif text-[15px] max-md:text-base leading-tight field-ink-soft" data-bar-stake-name={r.n}>
                        {r.title}
                      </span>
                    </div>
                  ))}
                  <p className="mt-2 max-w-[38ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] field-ink-soft">
                    Scroll — the bar reads top to bottom
                  </p>
                </div>
              </div>

              {/* hacktivation energy: the definition stamps as the bar closes */}
              <Animation target="[data-fg-hack]" start={84} end={92} fromTo={[{ scale: 1.5, rotate: -7, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, ease: 'power4.in' }]}>
                <p className="mx-auto mt-10 max-w-2xl text-center text-[15px] max-md:text-base leading-relaxed text-[color-mix(in_srgb,var(--field-ink)_78%,transparent)]">
                  <span data-fg-hack className="inline-block font-mono text-xs tracking-wide text-wine-400">HACKTIVATION ENERGY</span>
                  <span className="mt-2 block">
                    The effort a newcomer spends before their first useful commit.
                    Lower is better, so we grind it down: clone a repo, run the
                    tests, ship a fix. Setup should never be the hard part.
                  </span>
                </p>
              </Animation>
            </div>
          </section>
        </Pin>

        {/* each plate lights as it frames: number turns wine, stake follows.
            From-states are loam-toned — the room sits on stable night. */}
        {REQUIREMENTS.map((r, i) => (
          <Waypoint
            key={r.n}
            at={i * 18 + 2}
            tween={{
              target: `[data-bar-num="${r.n}"]`,
              fromTo: [
                { backgroundColor: 'transparent', borderColor: 'rgba(90,66,39,0.9)', color: 'rgba(184,162,132,0.9)' },
                { backgroundColor: 'rgba(150,58,104,0.18)', borderColor: '#b05a81', color: '#f0e4c8', duration: 2 },
              ],
            }}
          />
        ))}
        {REQUIREMENTS.map((r, i) => (
          <Waypoint
            key={`stake-${r.n}`}
            at={i * 18 + 4}
            tween={{
              target: `[data-bar-stake="${r.n}"]`,
              fromTo: [
                { borderColor: 'rgba(90,66,39,0.6)' },
                { borderColor: 'rgba(176,90,129,0.7)', duration: 2 },
              ],
            }}
          />
        ))}
      </Root>

      {/* movement three: the ledger and the asked-often, on night */}
      <Root
        id="guide-ledger"
        className="relative"
        start="top bottom"
        end="bottom top"
        field={{ from: LOAM, to: LOAM }}
      >
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            {/* status ledger: each row's rule draws itself left to right */}
            <Reveal className={`rounded-sm p-7 sm:p-9 ${FIELD_PLATE}`} y={24}>
              <h3 className="display text-2xl field-ink" data-reveal-item>Where the project stands</h3>
              <dl className="mt-7 space-y-0">
                {STATUS.map((row, i) => (
                  <div
                    key={row.k}
                    data-reveal-item
                    className="relative grid gap-1 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4"
                  >
                    {i > 0 && (
                      <Animation target={`[data-status-rule="${i}"]`} start={62 + i * 5} end={68 + i * 5} fromTo={[{ scaleX: 0 }, { scaleX: 1, ease: 'power1.inOut' }]}>
                        <span data-status-rule={i} aria-hidden="true" className="absolute left-0 top-0 block h-px w-full origin-left bg-[color-mix(in_srgb,var(--field-line)_90%,transparent)]" />
                      </Animation>
                    )}
                    <dt className="font-mono text-xs uppercase tracking-[0.16em] field-ink-soft sm:pt-1">{row.k}</dt>
                    <dd className="text-[15px] max-md:text-base leading-relaxed text-[color-mix(in_srgb,var(--field-ink)_85%,transparent)]">
                      {row.href ? (
                        <a href={row.href} target="_blank" rel="noreferrer" className="underline decoration-gold-leaf/40 underline-offset-4 transition-colors hover:text-wine-400 hover:decoration-wine-400/50">
                          {row.v}
                        </a>
                      ) : (
                        row.v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              <a
                href="https://github.com/eskolx-labs"
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 border-t border-[color-mix(in_srgb,var(--field-line)_60%,transparent)] pt-5 text-sm font-medium text-wine-400 underline-offset-4 transition-colors hover:text-wine-300 hover:underline"
                data-reveal-item
              >
                Watch the repos
                <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" aria-hidden="true">
                  <path d="M2 7 H12 M8 3 L12 7 L8 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Reveal>

            {/* asked often, on the facing page */}
            <Reveal className={`rounded-sm p-7 sm:p-9 ${FIELD_PLATE}`} y={24}>
              <h3 className="display text-2xl field-ink" data-reveal-item>Asked often</h3>
              <div className="mt-6 overflow-hidden rounded-sm border border-[color-mix(in_srgb,var(--field-line)_60%,transparent)]">
                {FAQ.map((item) => (
                  <details key={item.q} className="group border-t border-[color-mix(in_srgb,var(--field-line)_45%,transparent)] first:border-t-0" data-reveal-item>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 transition-colors hover:bg-[color-mix(in_srgb,var(--field-ink)_5%,transparent)] [&::-webkit-details-marker]:hidden">
                      <span className="font-serif text-[16px] font-medium leading-snug field-ink">{item.q}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--field-line)_90%,transparent)] text-[color:var(--field-ink-soft)] transition-transform duration-300 group-open:rotate-45">
                        <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
                          <path d="M6 1 V11 M1 6 H11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </span>
                    </summary>
                    <p className="max-w-[74ch] px-5 pb-5 text-[16px] leading-relaxed text-[color-mix(in_srgb,var(--field-ink)_80%,transparent)]">
                      {item.a}
                      {item.href && (
                        <>
                          {' '}
                          <a href={item.href} target="_blank" rel="noreferrer" className="text-wine-400 underline decoration-gold-leaf/40 underline-offset-4 transition-colors hover:text-wine-300">
                            {item.linkText}
                          </a>
                          {item.after}
                        </>
                      )}
                    </p>
                  </details>
                ))}
              </div>
              <p className="mt-5 text-sm text-[color-mix(in_srgb,var(--field-ink)_70%,transparent)]" data-reveal-item>
                Something unanswered?{' '}
                <a href="https://t.me/eskolx_labs" target="_blank" rel="noreferrer" className="text-wine-400 underline-offset-4 transition-colors hover:text-wine-300 hover:underline">
                  Telegram
                </a>{' '}
                or{' '}
                <a href="mailto:eskolxlabs@gmail.com" className="text-wine-400 underline-offset-4 transition-colors hover:text-wine-300 hover:underline">
                  eskolxlabs@gmail.com
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </Root>
    </>
  )
}
