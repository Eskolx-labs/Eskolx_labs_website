'use client'

import { Root, Animation } from '@/lib/scrollytelling'
import { Reveal } from '@/components/reveal'
import { SealMark } from '@/components/botanical/seal-mark'
import { Mail } from 'lucide-react'

const LINKS = [
  { label: 'Open-Source Code', href: 'https://github.com/eskolx-labs' },
  { label: 'Builder Chat', href: 'https://t.me/eskolx_labs' },
]

export function SiteFooter() {
  return (
    <Root
      className="relative overflow-hidden border-t border-parchment-ink/20 bg-parchment"
      field={{
        from: { bg: '#ece1c6', ink: '#29190c', soft: '#5c4a33', line: '#b9a67f' },
        to: { bg: '#ece1c6', ink: '#29190c', soft: '#5c4a33', line: '#b9a67f' },
      }}
    >
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Animation target="[data-seal]" start={0} end={40} fromTo={[{ scale: 1.7, opacity: 0, rotate: -10 }, { scale: 1, opacity: 1, rotate: -4 }]}>
              <a href="#top" className="flex items-center gap-3.5">
                <span className="font-script text-3xl leading-none text-parchment-ink">Eskolx Labs</span>
                <SealMark label="Eskolx Labs seal" className="h-11 w-11 -rotate-4" data-seal />
              </a>
            </Animation>
            <p className="display mt-5 text-xl italic leading-snug text-gold-ink">
              Must Build, Not Just Learn.
            </p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-20">
            <nav className="flex flex-col gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-parchment-ink/70">
                Resources
              </span>
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={l.href.startsWith('mailto') ? undefined : 'noreferrer'}
                  className="inline-block py-1 text-[15px] text-parchment-ink/80 underline-offset-4 transition-colors hover:text-parchment-ink hover:underline hover:decoration-gold-leaf/60"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-parchment-ink/70">
                Contact
              </span>
              <a
                href="mailto:eskolxlabs@gmail.com"
                className="flex items-center gap-2.5 py-1 text-[15px] text-parchment-ink/80 transition-colors hover:text-parchment-ink"
              >
                <Mail className="h-4 w-4 text-wine-600" />
                eskolxlabs@gmail.com
              </a>
              <p className="mt-2 max-w-[26ch] font-serif text-sm leading-relaxed text-parchment-ink/75">
                Open-source statistical infrastructure.
              </p>
              <a
                href="#top"
                className="mt-3 inline-flex items-center gap-2 py-1 text-sm text-parchment-ink/80 transition-colors hover:text-parchment-ink"
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

        <div className="rule-ornament mt-14 !text-gold-leaf/60 before:!opacity-40 after:!opacity-40">
          <p className="whitespace-nowrap px-2 font-mono text-xs tabular text-parchment-ink/80">
            © {new Date().getFullYear()} Eskolx Labs · MIT License
          </p>
        </div>
      </div>
    </Root>
  )
}
