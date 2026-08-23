'use client'

import { Root, Pin, Animation } from '@/lib/scrollytelling'
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

const IDENTITIES = [
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

/* Hand-typed text: each unit blinks onto the page inside its own tiny
   window, so scrubbing the pin literally writes the line — fast forward
   types faster, slow down and it spells. Words for prose, chars for
   titles; everything is plain text to screen readers and static below md. */
function Typed({
  text,
  unit,
  t0,
  span,
  className,
}: {
  text: string
  unit: 'char' | 'word'
  t0: number
  span: number
  className?: string
}) {
  const parts = unit === 'char' ? Array.from(text) : text.split(' ')
  const step = span / parts.length
  return (
    <span aria-label={text} className={className}>
      <span aria-hidden="true">
        {parts.map((p, j) => (
          <Animation
            key={j}
            start={t0 + j * step}
            end={t0 + j * step + Math.min(step * 0.55, 0.5)}
            fromTo={[{ opacity: 0 }, { opacity: 1, ease: 'none' }]}
            className="inline-block"
          >
            <span className="inline-block">{unit === 'word' && j < parts.length - 1 ? `${p}\u00A0` : p}</span>
          </Animation>
        ))}
      </span>
    </span>
  )
}

/*
 * The Eshcol identities told as one pinned spread: the room holds while
 * each plate is pressed in turn — frame rises, icon draws, then the title
 * and body write themselves by hand — holds long enough to read, and lifts
 * away for the next. Below md the plates stack as ordinary flow.
 */
export function OriginStory() {
  return (
    <Root
      id="ecosystem"
      start="top top"
      end="bottom bottom"
      field={{
        from: { bg: '#241407', ink: '#f0e4c8', soft: '#b8a284', line: '#5a4227' },
        to: { bg: '#241407', ink: '#f0e4c8', soft: '#b8a284', line: '#5a4227' },
      }}
    >
      <Pin height="340vh">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
          <Reveal className="flex items-start justify-between gap-6">
            <div data-reveal-item>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-gold-leaf">The name</p>
              <h2 className="display mt-4 max-w-xl text-[clamp(2rem,3.6vw,3rem)] leading-tight text-cream-100">
                The Eshcol Identity
              </h2>
              <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-cream-200/80">
                Abundance &amp; interconnected execution. Three facts of the soil this lab grows in.
              </p>
            </div>
            <SealMark label="Eskolx Labs seal" className="mt-1 hidden h-14 w-14 shrink-0 sm:block sm:h-16 sm:w-16" />
          </Reveal>

          <div className="mt-10 grid min-h-0 flex-1 md:mt-12">
            {IDENTITIES.map((card, i) => {
              const s = i * 32
              return (
                <div key={card.title} className="py-10 motion-safe:md:[grid-area:1/1] md:h-full md:py-0">
                  {/* plate entrance */}
                  <Animation target={`[data-id-plate="${i}"]`} start={s} end={s + 4} fromTo={[{ y: 44, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }]}>
                    <article data-id-plate={i} className="plate-frame hatch relative mx-auto max-w-3xl border border-parchment-ink/20 bg-parchment p-8 text-parchment-ink shadow-[0_24px_60px_-30px_rgb(0_0_0/0.45)] sm:p-10 lg:p-12">
                      {/* index numeral */}
                      <Animation target={`[data-id-num="${i}"]`} start={s + 2} end={s + 5} fromTo={[{ opacity: 0 }, { opacity: 1 }]}>
                        <span data-id-num={i} className="tabular absolute right-7 top-7 font-mono text-sm tracking-widest text-parchment-ink/50">
                          {`0${i + 1}`}
                        </span>
                      </Animation>

                      {/* the icon draws itself across */}
                      <Animation
                        target={`[data-id-icon="${i}"]`}
                        start={s + 4}
                        end={s + 9}
                        fromTo={[{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'power2.inOut' }]}
                      >
                        <div data-id-icon={i} className="inline-block text-parchment-ink/85">
                          <card.icon className="h-11 w-11" />
                        </div>
                      </Animation>

                      {/* kicker stamps in before the writing starts */}
                      <Animation target={`[data-id-kicker="${i}"]`} start={s + 5} end={s + 8} fromTo={[{ scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, ease: 'power4.in' }]}>
                        <p data-id-kicker={i} className="mt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-wine-700">
                          Identity {`0${i + 1}`}
                        </p>
                      </Animation>

                      <h3 className="display mt-4 min-h-[2.6em] text-[clamp(1.6rem,2.8vw,2.3rem)] leading-[1.12]" >
                        <Typed text={card.title} unit="char" t0={s + 7} span={9} />
                      </h3>

                      <p className="mt-4 max-w-[62ch] font-serif text-base leading-relaxed text-parchment-ink/80 sm:text-lg">
                        <Typed text={card.body} unit="word" t0={s + 13} span={11} />
                      </p>

                      {/* the wax dot presses once the plate is written */}
                      <Animation target={`[data-id-stamp="${i}"]`} start={s + 24} end={s + 27} fromTo={[{ scale: 1.7, opacity: 0 }, { scale: 1, opacity: 1, ease: 'power4.in' }]}>
                        <span data-id-stamp={i} aria-hidden="true" className="absolute bottom-8 right-8 block h-2 w-2 rounded-full bg-wine-600/80" />
                      </Animation>
                    </article>
                  </Animation>

                  {/* the plate lifts away for the next one */}
                  {i < IDENTITIES.length - 1 && (
                    <Animation target={`[data-id-plate="${i}"]`} start={s + 28} end={s + 32} fromTo={[{ y: 0, opacity: 1 }, { y: -36, opacity: 0, ease: 'power1.in', immediateRender: false }]} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </Pin>
    </Root>
  )
}
