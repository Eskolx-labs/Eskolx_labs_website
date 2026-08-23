'use client'

import { Root } from '@/lib/scrollytelling'
import { PARCHMENT } from '@/lib/field-controller'
import { Reveal } from '@/components/reveal'
import { SealMark } from '@/components/botanical/seal-mark'

const DOES = [
  'Build statistical and data-science libraries from scratch, in pure Python',
  'Read the books and papers behind every method before writing a line',
  'Publish everything under MIT, including the study notes',
  'Use our own packages on real, unsolved problems',
]

const DONTs = [
  'Wrap existing libraries and call the result ours',
  'Hand out certificates or video courses',
  'Confuse watching tutorials with learning',
  'Gate participation behind credentials',
]

const REQUIREMENTS = [
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
    body: 'The loop ends when you can explain what you built. Explanations worth publishing go into Eskolx-Open.',
  },
]

const STATUS = [
  { k: 'Status', v: 'Actively maintained.' },
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

const FAQ = [
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
    a: 'Books and research papers. Participants take notes before implementing anything, and those notes live in an open Obsidian vault anyone can download. Explanations good enough for the public end up on this site.',
  },
  {
    q: 'Is there a longer FAQ?',
    a: 'Not yet. This one stays short on purpose. Until the expanded version ships, ask us directly on Telegram or by email.',
  },
]

/*
 * The practicalities spread: what we do and don't, what joining takes,
 * where the project stands, and the short FAQ. An ordinary flowing chapter,
 * no pin — the reader came here for answers, not theatre.
 */
export function FieldGuide() {
  return (
    <Root id="fieldguide" className="relative bg-parchment py-24" field={{ from: PARCHMENT, to: PARCHMENT }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
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
          <SealMark label="Eskolx Labs seal" className="h-14 w-14 shrink-0 -rotate-6 sm:h-16 sm:w-16" />
        </Reveal>

        {/* do / don't */}
        <Reveal className="mt-14 grid gap-px overflow-hidden rounded-sm border border-parchment-ink/20 bg-parchment-ink/15 md:grid-cols-2" y={24}>
          <div className="bg-parchment p-7 sm:p-9" data-reveal-item>
            <h3 className="display text-xl text-parchment-ink">What we do</h3>
            <ul className="mt-6 space-y-4">
              {DOES.map((d) => (
                <li key={d} className="flex gap-3.5 text-[15px] leading-relaxed text-parchment-ink/85">
                  <svg viewBox="0 0 14 14" className="mt-1 h-3.5 w-3.5 shrink-0 text-wine-600" aria-hidden="true">
                    <path d="M2 7.5 L5.5 11 L12 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-parchment p-7 sm:p-9" data-reveal-item>
            <h3 className="display text-xl text-parchment-ink">What we don&apos;t</h3>
            <ul className="mt-6 space-y-4">
              {DONTs.map((d) => (
                <li key={d} className="flex gap-3.5 text-[15px] leading-relaxed text-parchment-ink/70">
                  <svg viewBox="0 0 14 14" className="mt-1 h-3.5 w-3.5 shrink-0 text-parchment-ink/50" aria-hidden="true">
                    <path d="M3 3 L11 11 M11 3 L3 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* requirements */}
          <Reveal className="rounded-sm border border-parchment-ink/20 bg-parchment p-7 sm:p-9" y={24}>
            <h3 className="display text-xl text-parchment-ink" data-reveal-item>What it takes to join</h3>
            <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-parchment-ink/75" data-reveal-item>
              The mission sets the bar. Here it is, plainly:
            </p>
            <ol className="mt-7 space-y-6">
              {REQUIREMENTS.map((r) => (
                <li key={r.n} className="grid grid-cols-[2.6rem_1fr] gap-x-4" data-reveal-item>
                  <span className="tabular font-mono text-sm leading-7 text-gold-ink">{r.n}</span>
                  <span>
                    <span className="display block text-lg text-parchment-ink">{r.title}</span>
                    <span className="mt-1.5 block max-w-[58ch] text-[15px] leading-relaxed text-parchment-ink/75">{r.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-8 border-t border-dashed border-parchment-ink/30 pt-6" data-reveal-item>
              <p className="text-[15px] leading-relaxed text-parchment-ink/80">
                <span className="font-mono text-xs tracking-wide text-wine-600">HACKTIVATION ENERGY</span>
                <span className="mt-2 block max-w-[64ch]">
                  The effort a newcomer spends before their first useful commit.
                  Lower is better, so we grind it down: clone a repo, run the
                  tests, ship a fix. Setup should never be the hard part.
                </span>
              </p>
            </div>
          </Reveal>

          {/* status ledger */}
          <Reveal className="rounded-sm border border-parchment-ink/20 bg-parchment p-7 sm:p-9" y={24}>
            <h3 className="display text-xl text-parchment-ink" data-reveal-item>Where the project stands</h3>
            <dl className="mt-7 space-y-0">
              {STATUS.map((row, i) => (
                <div
                  key={row.k}
                  data-reveal-item
                  className={`grid gap-1 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4 ${i > 0 ? 'border-t border-parchment-ink/15' : ''}`}
                >
                  <dt className="font-mono text-xs uppercase tracking-[0.16em] text-parchment-ink/60 sm:pt-1">{row.k}</dt>
                  <dd className="text-[15px] leading-relaxed text-parchment-ink/85">{row.v}</dd>
                </div>
              ))}
            </dl>
            <a
              href="https://github.com/eskolx-labs"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 border-t border-parchment-ink/15 pt-5 text-sm font-medium text-wine-700 underline-offset-4 transition-colors hover:text-wine-600 hover:underline hover:decoration-wine-500/50"
              data-reveal-item
            >
              Watch the repos
              <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M2 7 H12 M8 3 L12 7 L8 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Reveal>
        </div>

        {/* FAQ */}
        <Reveal className="mt-16" y={24}>
          <h3 className="display text-2xl text-parchment-ink" data-reveal-item>Asked often</h3>
          <div className="mt-7 overflow-hidden rounded-sm border border-parchment-ink/20 bg-parchment">
            {FAQ.map((item, i) => (
              <details key={item.q} className={`group ${i > 0 ? 'border-t border-parchment-ink/15' : ''}`} data-reveal-item>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 transition-colors hover:bg-parchment-ink/[0.04] sm:px-8 [&::-webkit-details-marker]:hidden">
                  <span className="font-serif text-[16px] font-medium text-parchment-ink sm:text-lg">{item.q}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-parchment-ink/30 text-parchment-ink/70 transition-transform duration-300 group-open:rotate-45">
                    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
                      <path d="M6 1 V11 M1 6 H11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="max-w-[74ch] px-6 pb-6 pl-6 text-[15px] leading-relaxed text-parchment-ink/80 sm:px-8 sm:pl-[4.25rem]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
          <p className="mt-5 text-sm text-parchment-ink/65" data-reveal-item>
            Something unanswered?{' '}
            <a href="https://t.me/eskolx_labs" target="_blank" rel="noreferrer" className="text-wine-700 underline-offset-4 transition-colors hover:text-wine-600 hover:underline">
              Telegram
            </a>{' '}
            or{' '}
            <a href="mailto:eskolxlabs@gmail.com" className="text-wine-700 underline-offset-4 transition-colors hover:text-wine-600 hover:underline">
              eskolxlabs@gmail.com
            </a>
            .
          </p>
        </Reveal>
      </div>
    </Root>
  )
}
