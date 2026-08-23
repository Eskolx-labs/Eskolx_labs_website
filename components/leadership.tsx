'use client'

import { Root, Animation } from '@/lib/scrollytelling'
import { PARCHMENT, LOAM } from '@/lib/field-controller'
import { Reveal } from '@/components/reveal'

const LEADERS = [
  {
    name: 'Barkilign Mulatu',
    role: 'Founder & CEO',
    initials: 'BM',
  },
  {
    name: 'Natnael Getahun',
    role: 'Co-Founder and Member of Technical Staff',
    initials: 'NG',
  },
]

export function Leadership() {
  return (
    <Root
      id="leadership"
      start="top bottom"
      end="bottom top"
      className="relative overflow-hidden bg-loam-950 py-24"
      field={{
        from: PARCHMENT,
        to: LOAM,
      }}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,3.8vw,3.2rem)] leading-tight text-cream-100" data-reveal-item>
            The keepers of the root
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream-200/80" data-reveal-item>
            Leadership and governance. Two people tend the direction; everyone
            else tends the code.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:max-w-4xl">
          {LEADERS.map((leader, i) => (
            <article
              key={leader.name}
              className="rounded-sm border border-loam-700/80 bg-loam-900 p-7"
            >
              <Animation
                target={`[data-keeper="${i}"]`}
                start={i * 20}
                end={i * 20 + 40}
                fromTo={[{ y: 36, opacity: 0 }, { y: 0, opacity: 1 }]}
              >
                <div data-keeper={i}>
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-wine-500/50 bg-wine-600/20 font-display text-xl tracking-wide text-cream-100">
                    {leader.initials}
                  </span>
                  <h3 className="display mt-5 text-2xl leading-snug text-cream-100">{leader.name}</h3>
                  <p className="mt-1 font-serif font-medium text-wine-300">{leader.role}</p>
                </div>
              </Animation>
            </article>
          ))}
        </div>

        <div className="mt-6 lg:max-w-4xl">
          <a
            href="https://github.com/eskolx-labs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-serif text-[15px] text-cream-200/85 underline-offset-4 transition-colors hover:text-cream-100 hover:underline hover:decoration-gold-leaf/60"
          >
            Find us in the commit log
            <svg viewBox="0 0 14 14" className="h-3 w-3" aria-hidden="true">
              <path d="M2 7 H12 M8 3 L12 7 L8 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="mt-6 flex flex-col items-start gap-5 rounded-sm border border-loam-700/80 bg-loam-900/70 p-7 sm:flex-row sm:items-center lg:max-w-4xl">
          <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0 text-gold-leaf" aria-hidden="true" fill="none">
            <path d="M20 4 L26.5 15.5 C24.5 18.5 22.5 20 20 20 C17.5 20 15.5 18.5 13.5 15.5 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M20 4 V13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
            <circle cx="20" cy="15.8" r="1.4" fill="currentColor" stroke="none" />
            <path d="M20 20 V24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M20 24 C20 28 16.5 29 14 32.5 M20 24 C20 28 23.5 29 26 32.5 M20 24 C19.4 28.5 20.6 30.5 20 34" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M14 32.5 C12.6 33.4 12 34.8 12.2 36.4 M26 32.5 C27.4 33.4 28 34.8 27.8 36.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
          </svg>
          <div>
            <p className="font-serif text-[15px] font-medium text-cream-100">Core talent pipeline</p>
            <p className="mt-1.5 max-w-[68ch] text-[15px] leading-relaxed text-cream-200/80">
              An internal engineering internship feeding an open-source
              maintainer pipeline, cultivating the next generation of builders.
            </p>
          </div>
        </div>
      </div>
    </Root>
  )
}
