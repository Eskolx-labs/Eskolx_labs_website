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
    <>
      {/* the keepers' dusk: the flood holds day to its end; this short seam
          carries the field into night before the people arrive — the
          chapter itself reads on settled loam, never mid-turn */}
      <Root
        id="keepers-dusk"
        className="relative flex h-[28vh] items-center justify-center bg-loam-950 md:h-[55vh]"
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

      <Root
        id="leadership"
        start="top bottom"
        end="bottom top"
        className="relative overflow-hidden py-24"
        field={{ from: LOAM, to: LOAM }}
      >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <h2 className="display text-[clamp(2rem,3.8vw,3.2rem)] leading-tight field-ink" data-reveal-item>
            The keepers of the root
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[color-mix(in_srgb,var(--field-ink)_80%,transparent)]" data-reveal-item>
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
              {/* both keepers land in the first fifth of the crossing, so
                  the pair is always settled together by the time it's read —
                  a half-arrived card reads as broken, not cinematic */}
              <Animation
                target={`[data-keeper="${i}"]`}
                start={4 + i * 4}
                end={16 + i * 4}
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
            className="link-draw inline-flex items-center gap-2 font-serif text-copy text-[color-mix(in_srgb,var(--field-ink)_85%,transparent)] transition-colors hover:text-[var(--field-ink)]"
          >
            Find us in the commit log
            <svg viewBox="0 0 14 14" className="h-3 w-3" aria-hidden="true">
              <path d="M2 7 H12 M8 3 L12 7 L8 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

      </div>
    </Root>
    </>
  )
}
