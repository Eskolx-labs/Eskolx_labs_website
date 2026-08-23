'use client'

import { Root, Animation } from '@/lib/scrollytelling'
import { Reveal } from '@/components/reveal'

const LEADERS = [
  {
    name: 'Barkilign Mulatu',
    role: 'Founder & CEO',
    focus: 'Corporate Strategy, Vision & Ecosystem Growth',
    detail: 'Former ALX, 10 Academy, iCog Labs Intern Alumni',
    initials: 'BM',
  },
  {
    name: 'Natnael Getahun',
    role: 'Co-Founder & CTO',
    focus: 'Technical Architecture, Open-Source Automation Engines & Core Research Lead',
    detail: 'Leads the core engineering and research direction',
    initials: 'NG',
  },
]

export function Leadership() {
  return (
    <Root
      id="leadership"
      className="relative overflow-hidden bg-loam-950 py-24"
      field={{
        from: { bg: '#241407', ink: '#f0e4c8', soft: '#b8a284', line: '#5a4227' },
        to: { bg: '#241407', ink: '#f0e4c8', soft: '#b8a284', line: '#5a4227' },
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
                  <p className="mt-3.5 text-[15px] leading-relaxed text-cream-200/80">{leader.focus}</p>
                  <p className="mt-4 border-t border-loam-800 pt-3.5 text-sm text-cream-200/90">
                    {leader.detail}
                  </p>
                </div>
              </Animation>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-start gap-5 rounded-sm border border-loam-700/80 bg-loam-900/70 p-7 sm:flex-row sm:items-center lg:max-w-4xl">
          <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0 text-gold-leaf" aria-hidden="true" fill="none">
            <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="26" cy="14" r="5" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="20" cy="25" r="5" stroke="currentColor" strokeWidth="1.8" />
            <path d="M20 30 C20 33 18 35 15 36 M20 30 C20 33 22 35 25 36" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <div>
            <p className="font-serif text-[15px] font-medium text-cream-100">Core talent pipeline</p>
            <p className="mt-1.5 text-[15px] leading-relaxed text-cream-200/80">
              An internal engineering internship feeding an open-source
              maintainer pipeline, cultivating the next generation of builders.
            </p>
          </div>
        </div>
      </div>
    </Root>
  )
}
