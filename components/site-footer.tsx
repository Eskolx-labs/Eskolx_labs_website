'use client'

import { Root, Animation } from '@/lib/scrollytelling'
import { LOAM } from '@/lib/field-controller'
import { Reveal } from '@/components/reveal'
import { SealMark } from '@/components/botanical/seal-mark'

const LINKS = [
  { label: 'Open-Source Code', href: 'https://github.com/eskolx-labs' },
  { label: 'Builder Chat', href: 'https://t.me/eskolx_labs' },
  { label: 'Guide', href: '#fieldguide' },
]

export function SiteFooter() {
  return (
    <>
      <Root
        className="relative overflow-hidden border-t border-[color-mix(in_srgb,var(--field-line)_45%,transparent)] field-bg"
        start="top bottom"
        end="bottom top"
        field={{ from: LOAM, to: LOAM }}
      >
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
            <div className="max-w-md">
              <Animation target="[data-seal]" start={0} end={40} fromTo={[{ scale: 2, opacity: 0, rotate: -14 }, { scale: 1, opacity: 1, rotate: -4, ease: 'power4.in' }]}>
                <a href="#top" className="flex items-center gap-3.5">
                  <span className="font-script text-3xl leading-none field-ink">Eskolx Labs</span>
                  <SealMark label="Eskolx Labs seal" className="h-11 w-11 -rotate-4" data-seal />
                </a>
              </Animation>
              <p className="display mt-6 text-[clamp(1.9rem,3vw,2.75rem)] italic leading-[1.15] text-gold-leaf">
                Must Build, Not&nbsp;Just&nbsp;Learn.
              </p>
            </div>

            <div className="flex flex-col gap-10 sm:flex-row sm:gap-20">
              <nav className="flex flex-col gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] field-ink-soft">
                  Resources
                </span>
                {LINKS.map((l) => {
                  const external = l.href.startsWith('http')
                  return (
                    <a
                      key={l.label}
                      href={l.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      className="inline-block py-1 text-[15px] text-[color:var(--field-ink-soft)] underline-offset-4 transition-colors hover:text-[color:var(--field-ink)] hover:underline hover:decoration-gold-leaf/60"
                    >
                      {l.label}
                    </a>
                  )
                })}
              </nav>
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] field-ink-soft">
                  Contact
                </span>
                <a
                  href="mailto:eskolxlabs@gmail.com"
                  className="flex items-center gap-2.5 py-1 text-[15px] text-[color:var(--field-ink-soft)] transition-colors hover:text-[color:var(--field-ink)]"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4 text-wine-400" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                    <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
                    <path d="M2 4.5 L8 9 L14 4.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  eskolxlabs@gmail.com
                </a>
                <p className="mt-2 max-w-[26ch] font-serif text-sm leading-relaxed text-[color:var(--field-ink-soft)]">
                  Statistical libraries, rebuilt from scratch, in the open.
                </p>
                <a
                  href="#top"
                  className="mt-3 inline-flex items-center gap-2 py-1 text-sm text-[color:var(--field-ink-soft)] transition-colors hover:text-[color:var(--field-ink)]"
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                    <path
                      d="M8 13 V3 M3.5 7.5 L8 2.5 L12.5 7.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  Back to the soil
                </a>
              </div>
            </div>
          </Reveal>

          {/* the reading rule completes: one gold hairline draws as the book
              shuts — the rail's progress arriving at its last page */}
          <Animation target="[data-close-rule]" start={45} end={82} fromTo={[{ scaleX: 0 }, { scaleX: 1, ease: 'power1.inOut' }]}>
            <span data-close-rule aria-hidden="true" className="mt-14 block h-px w-full origin-left bg-gold-leaf/70" />
          </Animation>

          <div className="rule-ornament mt-8 !text-gold-leaf/60 before:!opacity-40 after:!opacity-40">
            <p suppressHydrationWarning className="whitespace-nowrap px-2 font-mono text-xs tabular text-[color:var(--field-ink-soft)]">
              © {new Date().getFullYear()} Eskolx Labs · MIT License
            </p>
          </div>
        </div>
      </Root>
    </>
  )
}
