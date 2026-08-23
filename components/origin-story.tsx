'use client'

import { Root, Animation } from '@/lib/scrollytelling'
import { Reveal } from '@/components/reveal'
import { SealMark } from '@/components/botanical/seal-mark'

/* Ink-drawn plate icons, one grammar: 1.6px ink strokes, no fills. */
function IconEshcol({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <path d="M24 14 C23.4 10.5 25 7.5 28 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M28 5.5 C31.5 4.2 34.5 5.2 35.8 8 C32.6 9.4 29.4 8.4 28 5.5 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {(
        [
          [18, 22],
          [30, 22],
          [24, 28],
          [18, 34],
          [30, 34],
          [24, 40],
        ] as const
      ).map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={4.6} stroke="currentColor" strokeWidth="1.8" />
      ))}
    </svg>
  )
}

function IconTrellisX({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <path d="M10 10 L38 38 M38 10 L10 38" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="24" cy="24" r="5.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M24 18.5 V11 M24 29.5 V37" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function IconSoil({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <path d="M6 20 H42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 27 H38" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
      <path d="M14 34 H34" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
      <path d="M16 20 C17 15 21 12 24 12 C27 12 31 15 32 20" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20 V13 M28 20 V13" stroke="currentColor" strokeWidth="1.6" opacity="0.8" />
      <path d="M24 12 C26 8 30 6.5 33 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

const CARDS = [
  {
    icon: IconEshcol,
    title: 'The Hebrew Root (Eshcol)',
    body: 'Eshcol means a rich cluster of grapes. Abundance bound to a single stem. Eskolx Labs binds statistical concepts into one integrated ecosystem where every module draws from a shared, well-tended root.',
  },
  {
    icon: IconTrellisX,
    title: "The 'X' Factor",
    body: 'The name carries three promises. Execution & Automation turns theory into running code. eXploration probes datasets and methods without bloat. Scale builds tools that grow from a single script to enterprise pipelines.',
  },
  {
    icon: IconSoil,
    title: 'Dark Earth Foundation',
    body: 'Eskolx grows in dark earth. The deep brown ground stands for mathematical rigor and the fertile soil that reproducible research grows from. No decoration, no bloat, just fertile ground for pure code.',
  },
]

export function OriginStory() {
  return (
    <Root
      id="ecosystem"
      className="relative bg-loam-950 py-24"
      field={{
        from: { bg: '#241407', ink: '#f0e4c8', soft: '#b8a284', line: '#5a4227' },
        to: { bg: '#241407', ink: '#f0e4c8', soft: '#b8a284', line: '#5a4227' },
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="plate-frame hatch border border-loam-700/70 bg-parchment px-6 py-14 text-parchment-ink shadow-[0_24px_60px_-30px_rgb(0_0_0/0.7)] sm:px-10 lg:px-14">
          <div className="flex items-start justify-between gap-6" data-reveal-item>
            <h2 className="display max-w-xl text-[clamp(2rem,3.6vw,3rem)] leading-tight">
              The Eshcol Identity
            </h2>
            <SealMark label="Eskolx Labs seal" className="mt-1 h-14 w-14 shrink-0 sm:h-16 sm:w-16" />
          </div>
          <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-parchment-ink/80" data-reveal-item>
            Abundance &amp; interconnected execution. Three facts of the soil this
            lab grows in.
          </p>

          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-parchment-ink/20 bg-parchment-ink/20 md:grid-cols-3" data-reveal-item>
            {CARDS.map((card, i) => (
              <article key={card.title} className="bg-parchment p-7 lg:p-8">
                <Animation
                  target={`[data-plate="${i}"]`}
                  start={i * 12}
                  end={i * 12 + 30}
                  fromTo={[{ y: 36, opacity: 0 }, { y: 0, opacity: 1 }]}
                >
                  <div data-plate={i}>
                    <card.icon className="h-10 w-10 text-parchment-ink/85" />
                    <h3 className="display mt-5 text-xl leading-snug">{card.title}</h3>
                    <p className="mt-3.5 text-[15px] leading-relaxed text-parchment-ink/75">
                      {card.body}
                    </p>
                  </div>
                </Animation>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </Root>
  )
}
