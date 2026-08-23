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
    body: 'Eskolx grows in dark earth: the deep brown ground of mathematical rigor that reproducible research comes from. Every published function starts down here, as formulas turned into tested code, long before anything shows above the surface.',
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
        <Reveal className="plate-frame hatch border border-loam-700/70 bg-parchment px-6 py-14 text-parchment-ink shadow-[0_24px_60px_-30px_rgb(0_0_0/0.35)] sm:px-10 lg:px-14">
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
              <article key={card.title} className="relative bg-parchment p-7 lg:p-8">
                <Animation
                  target={`[data-v2-icon="${i}"]`}
                  start={i * 12}
                  end={i * 12 + 20}
                  fromTo={[{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'power2.inOut' }]}
                >
                  <div data-v2-icon={i} className="inline-block">
                    <card.icon className="h-10 w-10 text-parchment-ink/85" />
                  </div>
                </Animation>
                <Animation
                  target={`[data-v2-title="${i}"]`}
                  start={i * 12 + 6}
                  end={i * 12 + 26}
                  fromTo={[{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'power2.inOut' }]}
                >
                  <h3 data-v2-title={i} className="display mt-5 text-xl leading-snug">
                    {card.title}
                  </h3>
                </Animation>
                <Animation
                  target={`[data-v2-body="${i}"]`}
                  start={i * 12 + 13}
                  end={i * 12 + 35}
                  fromTo={[{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'power2.inOut' }]}
                >
                  <p data-v2-body={i} className="mt-3.5 text-[15px] leading-relaxed text-parchment-ink/75">
                    {card.body}
                  </p>
                </Animation>
                <Animation
                  target={`[data-v2-stamp="${i}"]`}
                  start={i * 12 + 31}
                  end={i * 12 + 39}
                  fromTo={[{ scale: 1.7, opacity: 0 }, { scale: 1, opacity: 1, ease: 'power4.in' }]}
                >
                  <span
                    data-v2-stamp={i}
                    aria-hidden="true"
                    className="absolute right-6 top-6 block h-2 w-2 rounded-full bg-wine-600/80"
                  />
                </Animation>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </Root>
  )
}
