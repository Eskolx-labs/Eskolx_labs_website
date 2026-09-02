import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { YoutubeIcon, XIcon, LinkedinIcon } from '@/components/brand-icons'

const TEAM = [
  {
    role: 'Marketing',
    people: ['To be credited'],
    note: 'Campaigns, copy, and channel strategy.',
  },
  {
    role: 'Graphic design',
    people: ['To be credited'],
    note: 'The site look, the seal, the spreads.',
  },
  {
    role: 'Video editing',
    people: ['To be credited'],
    note: 'Shorts, recaps, and the explainers.',
  },
]

const EMBEDS = [
  {
    type: 'YouTube',
    icon: YoutubeIcon,
    title: 'Placeholder — team short',
    href: 'https://youtube.com/@eskolx_labs',
    credit: 'Video editing: to be credited',
  },
  {
    type: 'X',
    icon: XIcon,
    title: 'Placeholder — launch post',
    href: 'https://x.com/eskolx_labs',
    credit: 'Design: to be credited',
  },
  {
    type: 'LinkedIn',
    icon: LinkedinIcon,
    title: 'Placeholder — announcement',
    href: 'https://www.linkedin.com/company/eskolx-labs/',
    credit: 'Marketing: to be credited',
  },
]

export default function CreditsPage() {
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
          <p className="font-mono text-kicker uppercase tracking-label text-wine-600">Credits</p>
          <h1 className="display mt-4 text-[clamp(2.4rem,5vw,4rem)] leading-[1.06] text-[color:var(--field-ink)]">
            Who made what
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--field-ink-soft)]">
            The code is built in the open, and so is the craft around it. Every
            post, video, and visual on this page names the people who made it.
          </p>
        </header>

        <section className="mt-16">
          <h2 className="display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight text-[color:var(--field-ink)]">
            The team
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {TEAM.map((t) => (
              <article key={t.role} className="plate-frame rounded-sm border border-[color-mix(in_srgb,var(--field-line)_70%,transparent)] bg-[color-mix(in_srgb,var(--field-bg)_88%,transparent)] p-7">
                <h3 className="font-mono text-kicker uppercase tracking-label text-wine-600">{t.role}</h3>
                <p className="mt-3 display text-xl leading-snug text-[color:var(--field-ink)]">{t.people.join(', ')}</p>
                <p className="mt-2 text-copy leading-relaxed text-[color:var(--field-ink-soft)]">{t.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight text-[color:var(--field-ink)]">
            The work
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[color:var(--field-ink-soft)]">
            Embedded posts and videos, each with its credit. The embeds land
            here as the team ships them.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {EMBEDS.map((e) => (
              <a
                key={e.type}
                href={e.href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col rounded-sm border border-[color-mix(in_srgb,var(--field-line)_70%,transparent)] bg-[color-mix(in_srgb,var(--field-bg)_88%,transparent)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-wine-500/60"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--field-line)_80%,transparent)] text-[color:var(--field-ink)] transition-colors group-hover:border-wine-500 group-hover:bg-wine-600 group-hover:text-cream-100">
                  <e.icon className="h-5 w-5" />
                </span>
                <h3 className="display mt-5 text-xl leading-snug text-[color:var(--field-ink)]">{e.title}</h3>
                <p className="mt-1 font-mono text-xs tracking-wide text-wine-600">{e.type}</p>
                <p className="mt-3 text-copy leading-relaxed text-[color:var(--field-ink-soft)]">{e.credit}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-kicker uppercase tracking-[0.28em] text-[color:var(--field-ink-soft)] transition-colors group-hover:text-wine-600">
                  Open post
                  <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" fill="none">
                    <path d="M3 11 L11 3 M5 3 H11 V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
      </main>
      <SiteFooter />
    </div>
  )
}
