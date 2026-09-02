import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { GithubIcon, TelegramIcon } from '@/components/brand-icons'

const PHASES = [
  {
    n: '01',
    title: 'Descriptive statistics',
    weeks: 'Weeks 1-3',
    body: 'Numeric-data validation, count, min, max, range, mean, median, mode, quantiles, IQR, sample variance and standard deviation, coefficient of variation, skewness, kurtosis, frequency tables, histogram bin counts, covariance and Pearson correlation, and stable mean and variance where it changes the result for real data.',
  },
  {
    n: '02',
    title: 'Probability distributions',
    weeks: 'Weeks 4-9',
    body: 'One documented distribution interface: pmf or pdf, cdf, sf, ppf, mean, var, and reproducible random sampling. Bernoulli, Binomial, Geometric, Negative Binomial, Hypergeometric, Poisson, Uniform, Normal, Exponential, Gamma, Chi-square, Student t, and F. Explicit support, parameterization, invalid-parameter errors, and a tail-accuracy policy for every distribution.',
  },
  {
    n: '03',
    title: 'Inference and hypothesis testing',
    weeks: 'Weeks 10-12',
    body: 'One-sample and two-sample confidence intervals for means. One-sample t test, Welch two-sample t test, paired t test, and one- and two-proportion tests. A result object with statistic, p-value, degrees of freedom, confidence interval, alternative, method, and assumptions. Condition checks and plain-language warnings: a function must not return a p-value when its own input rules fail.',
  },
]

const LANES = [
  { name: 'Contract', what: 'API names, input rules, parameterization, exceptions, and examples.' },
  { name: 'Core A', what: 'First half of the assigned functions.' },
  { name: 'Core B', what: 'Second half of the assigned functions.' },
  { name: 'Numerics', what: 'Stable algorithm choice, precision checks, and boundary behavior.' },
  { name: 'Verification', what: 'Hand-worked answers from the book verified against the code, edge cases, property tests, and comparison cases with numpy, pandas, statsmodels, and scipy.' },
  { name: 'Knowledge', what: 'Public notes on Obsidian, textbook links, worked examples, tldraw explanations, and citations.' },
  { name: 'Integration', what: 'Documentation examples, packaging, CI, changelog, and end-to-end checks.' },
]

const DONE = [
  'Inputs, outputs, parameterization, support, assumptions, errors, and examples.',
  'A public-vault note linked to the textbook section and the deeper source if one was used.',
  'One hand-worked result, one usual case, one boundary case, and one invalid-input test.',
  'A controlled comparison against a trusted library.',
  'Review by somebody other than the author.',
  'One documentation example that runs in a clean environment.',
]

export default function ProgramPage() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="grain field-bg min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Link href="/" className="link-draw inline-flex items-center gap-2 font-serif text-copy text-[color:var(--field-ink-soft)] transition-colors hover:text-[color:var(--field-ink)]">
          <svg viewBox="0 0 14 14" className="h-3 w-3" aria-hidden="true">
            <path d="M12 7 H2 M6 3 L2 7 L6 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to the homepage
        </Link>

        <header className="mt-10 max-w-3xl">
          <p className="font-mono text-kicker uppercase tracking-label text-wine-600">The program</p>
          <h1 className="display mt-4 text-[clamp(2.4rem,5vw,4rem)] leading-[1.06] text-[color:var(--field-ink)]">
            Twelve weeks to statistical packages built from scratch
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--field-ink-soft)]">
            Everyone works on the same phase at the same time. The group divides
            each phase into small pieces, the work rotates, and the shared
            package goal does not. At the end, you turn your own packages loose
            on a question nobody has answered.
          </p>
        </header>

        <section className="mt-16">
          <h2 className="display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight text-[color:var(--field-ink)]">
            The three packages
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {PHASES.map((p) => (
              <article key={p.n} className="plate-frame rounded-sm border border-[color-mix(in_srgb,var(--field-line)_70%,transparent)] bg-[color-mix(in_srgb,var(--field-bg)_88%,transparent)] p-7">
                <div className="flex items-center justify-between">
                  <span className="tabular font-mono text-sm tracking-widest text-[color:var(--field-ink-soft)]">{p.n}</span>
                  <span className="font-mono text-kicker uppercase tracking-label text-wine-600">{p.weeks}</span>
                </div>
                <h3 className="display mt-4 text-2xl leading-snug text-[color:var(--field-ink)]">{p.title}</h3>
                <p className="mt-3 text-copy leading-relaxed text-[color:var(--field-ink-soft)]">{p.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight text-[color:var(--field-ink)]">
            How the cohort works
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[color:var(--field-ink-soft)]">
            No permanent teams. Each week the group splits the current phase into
            seven small pieces, and the work rotates. Everyone submits one real
            PR on Saturday and reviews two others. The group discusses the same
            material on Sunday, so knowledge does not fragment across hidden
            subteams.
          </p>
          <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-[color-mix(in_srgb,var(--field-line)_60%,transparent)] bg-[color-mix(in_srgb,var(--field-line)_40%,transparent)] md:grid-cols-2">
            {LANES.map((lane) => (
              <div key={lane.name} className="bg-[color-mix(in_srgb,var(--field-bg)_92%,transparent)] p-6">
                <h3 className="font-mono text-kicker uppercase tracking-label text-wine-600">{lane.name}</h3>
                <p className="mt-2 text-copy leading-relaxed text-[color:var(--field-ink-soft)]">{lane.what}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight text-[color:var(--field-ink)]">
            The book
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[color:var(--field-ink-soft)]">
            <em>Introduction to Probability and Statistics for Engineers and
            Scientists</em>, sixth edition, by Sheldon M. Ross. A clear, applied,
            upper-undergraduate book. It begins with data collection and
            descriptive statistics, moves through random variables and named
            distributions, then builds sampling distributions, estimation, and
            hypothesis tests. It still asks you to use calculus and derive
            results, but it explains why a method exists before burying it in
            notation.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[color:var(--field-ink-soft)]">
            Implementation is supported by the book, a minimum of two canonical
            research papers in the field, evidence of the same results using
            numpy, pandas, statsmodels, or scipy, a tldraw canvas explanation,
            and a note in the open Eskolx vault linking all of it together.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight text-[color:var(--field-ink)]">
            Definition of done
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[color:var(--field-ink-soft)]">
            Every feature PR must include:
          </p>
          <ul className="mt-6 max-w-2xl space-y-3">
            {DONE.map((item) => (
              <li key={item} className="flex items-start gap-3 text-copy leading-relaxed text-[color:var(--field-ink-soft)]">
                <svg viewBox="0 0 14 14" className="mt-1 h-3.5 w-3.5 shrink-0 text-wine-600" aria-hidden="true">
                  <path d="M2 7.5 L5.5 11 L12 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 border-t border-[color-mix(in_srgb,var(--field-line)_45%,transparent)] pt-12">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <p className="display text-xl leading-snug text-[color:var(--field-ink)] sm:text-2xl">
              The program starts at the repo.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/eskolx-labs"
                target="_blank"
                rel="noreferrer"
                className="btn-plate btn-wine !py-2.5"
              >
                <GithubIcon className="h-4 w-4" />
                Start with the seed repo
              </a>
              <a
                href="https://t.me/eskolx_labs"
                target="_blank"
                rel="noreferrer"
                className="btn-plate btn-outline !py-2.5"
              >
                <TelegramIcon className="h-4 w-4" />
                Talk to a builder
              </a>
            </div>
          </div>
        </section>
      </div>
      </main>
      <SiteFooter />
    </div>
  )
}
