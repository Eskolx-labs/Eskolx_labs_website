'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Root, Pin, Animation } from '@/lib/scrollytelling'
import { PARCHMENT } from '@/lib/field-controller'
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
    body: 'Eshcol is Hebrew for a rich cluster of grapes: many fruit, one stem. Our libraries grow the same way. Every function hangs on the same root, the books and papers behind it, and ripens alongside everything else in the cluster.',
  },
  {
    icon: IconTrellisX,
    title: "The 'X' Factor",
    body: 'The name carries three promises. Execution: theory becomes running code. eXploration: datasets and methods probed without bloat. Scale: tools that start as a single script and grow into full research pipelines.',
  },
  {
    icon: IconSoil,
    title: 'Dark Earth Foundation',
    body: 'Dark earth is where the work happens before anything shows above ground. A function starts as a question and a paper, becomes naive code, gets tested against the famous implementations, and improves until it earns its place in the library.',
  },
]

/* Hand-typed text: units blink onto the plate one by one from a
   time-based timeline, so a reader who stops scrolling still watches the
   sentence finish — pausing never leaves a word half-written. A cursor
   (a blinking ink bar) rides the writing and fades as the last word
   lands. Plain text to screen readers; static and fully visible under
   reduced motion. */
function Typed({
  id,
  text,
  unit,
  className,
  cursor = false,
}: {
  id: string
  text: string
  unit: 'char' | 'word'
  className?: string
  cursor?: boolean
}) {
  const parts = unit === 'char' ? Array.from(text) : text.split(' ')
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={cursor ? 'relative inline-block' : undefined}>
        {parts.map((p, j) => (
          <span
            key={j}
            data-tw={`${id}-${j}`}
            className={`inline-block motion-safe:opacity-0 ${p === ' ' ? 'whitespace-pre' : ''}`}
          >
            {unit === 'word' && j < parts.length - 1 ? `${p}\u00A0` : p === ' ' ? ' ' : p}
          </span>
        ))}
        {cursor && <span data-tw-cursor={id} className="tw-cursor" />}
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
  // the hand-typing engine: one paused timeline per identity, played the
  // moment that beat's stake of the pin arrives — independent of scroll
  // velocity, reversible on the way back up.
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.registerPlugin(ScrollTrigger)
      const ctx = gsap.context(() => {
        const room = () => {
          const pin = document.querySelector('#ecosystem [data-pin]') as HTMLElement | null
          return Math.max((pin?.offsetHeight ?? window.innerHeight * 3.4) - window.innerHeight, 1)
        }
        IDENTITIES.forEach((_, i) => {
          const titleEls = gsap.utils.toArray<HTMLElement>(`[data-tw^="i${i}t-"]`)
          const bodyEls = gsap.utils.toArray<HTMLElement>(`[data-tw^="i${i}b-"]`)
          if (!titleEls.length && !bodyEls.length) return
          const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
          if (titleEls.length) tl.fromTo(titleEls, { opacity: 0 }, { opacity: 1, duration: 0.04, stagger: 0.02 })
          if (bodyEls.length) tl.fromTo(bodyEls, { opacity: 0 }, { opacity: 1, duration: 0.03, stagger: 0.008 }, '>-0.01')
          // the pen rides the writing: the title cursor blinks and slides
          // to each character as it appears, then hands off to the body
          // cursor as the title ends — the pen steps down to the paragraph
          // and rides the words (tracking their lines, since the body
          // wraps) until the last word lands, then lifts off the page.
          // The body cursor never blinks — the title's blink is the hand;
          // the body is its echo. Both timelines stay fully reversible.
          const titleCursor = document.querySelector<HTMLElement>(`[data-tw-cursor="i${i}t"]`)
          const bodyCursor = document.querySelector<HTMLElement>(`[data-tw-cursor="i${i}b"]`)
          const titleEnd = titleEls.length * 0.02
          const bodyStart = titleEnd - 0.01
          const bodyEnd = bodyStart + bodyEls.length * 0.008
          const cycle = 0.3 + 0.3 + 0.12
          if (titleCursor) {
            const blinks = Math.max(Math.ceil(titleEnd / cycle), 1)
            tl.fromTo(
              titleCursor,
              { opacity: 1 },
              { opacity: 0.15, duration: 0.3, repeat: blinks, yoyo: true, repeatDelay: 0.12 },
              0,
            )
            titleEls.forEach((ch, j) => {
              tl.to(titleCursor, { x: ch.offsetLeft + ch.offsetWidth, duration: 0.02, ease: 'power1.out' }, j * 0.02)
            })
            // the pen hands off as the title ends: it lifts here while the
            // body cursor takes over below — the hand never stops writing.
            // The fade spans from the title's end to the blink's last
            // cycle, so it wins the opacity conflict while it runs and the
            // blink can never yoyo the pen back under the finished line.
            const fadeEnd = blinks * cycle
            tl.to(
              titleCursor,
              { opacity: 0, duration: Math.max(fadeEnd - titleEnd, 0.12), ease: 'power1.out' },
              titleEnd,
            )
          }
          if (bodyCursor) {
            // the pen steps down to the paragraph's first word, rides the
            // words as they appear (stepping down as the lines wrap), and
            // lifts as the last word lands — no blink, just the hand
            const first = bodyEls[0]
            tl.set(bodyCursor, { x: first.offsetLeft + first.offsetWidth, y: first.offsetTop }, bodyStart)
            tl.fromTo(bodyCursor, { opacity: 0 }, { opacity: 1, duration: 0.1, ease: 'power1.out' }, bodyStart)
            bodyEls.forEach((w, j) => {
              tl.to(
                bodyCursor,
                { x: w.offsetLeft + w.offsetWidth, y: w.offsetTop, duration: 0.008, ease: 'power1.out' },
                bodyStart + j * 0.008,
              )
            })
            tl.to(bodyCursor, { opacity: 0, duration: 0.2, ease: 'power1.out' }, bodyEnd)
          }
          ScrollTrigger.create({
            trigger: '#ecosystem [data-pin]',
            start: () => `top+=${room() * (i * 0.32 + 0.02)} top`,
            end: () => `top+=${room() * (i * 0.32 + 0.05)} top`,
            onEnter: () => tl.play(),
            onLeaveBack: () => tl.reverse(),
          })
        })
      })
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  return (
    <Root
      id="ecosystem"
      start="top top"
      end="bottom bottom"
      field={{ from: PARCHMENT, to: PARCHMENT }}
    >
      <Pin height="340vh">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pt-28 pb-16 sm:px-6 lg:px-8">
          <Reveal className="flex items-start justify-between gap-6">
            <div data-reveal-item>
              <p className="font-mono text-kicker uppercase tracking-label text-wine-600">The name</p>
              <h2 className="display mt-4 max-w-xl text-[clamp(2rem,3.6vw,3rem)] leading-tight text-parchment-ink">
                The Eshcol Identity
              </h2>
              <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-parchment-ink/75">
                Three facts of the soil this lab grows in.
              </p>
            </div>
            <SealMark label="Eskolx Labs seal" className="mt-1 hidden h-14 w-14 shrink-0 sm:block sm:h-16 sm:w-16" />
          </Reveal>

          <div className="mt-10 grid min-h-0 flex-1 md:mt-12">
            {IDENTITIES.map((card, i) => {
              const s = i * 32
              return (
                <div key={card.title} className="py-10 md:py-0 motion-safe:[@media(min-width:768px)_and_(min-height:700px)]:[grid-area:1/1] [@media(min-width:768px)_and_(min-height:700px)]:h-full">
                  {/* plate entrance — the first plate is already on stage at
                      progress 0, so the room never opens on a blank spread */}
                  {i > 0 && (
                    <Animation target={`[data-id-plate="${i}"]`} start={s} end={s + 3} fromTo={[{ y: 44, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }]} />
                  )}
                    <article data-id-plate={i} className="plate-frame hatch relative mx-auto max-w-3xl border border-parchment-ink/20 bg-parchment p-8 text-parchment-ink shadow-[0_24px_60px_-30px_rgb(0_0_0/0.45)] sm:p-10 lg:p-12">
                      {/* index numeral */}
                      <Animation target={`[data-id-num="${i}"]`} start={s + 1} end={s + 3} fromTo={[{ opacity: 0 }, { opacity: 1 }]}>
                        <span data-id-num={i} className="tabular absolute right-7 top-7 font-mono text-sm tracking-widest text-parchment-ink/50">
                          {`0${i + 1}`}
                        </span>
                      </Animation>

                      {/* the icon draws itself across — a pen stroke: fast
                          start, slow finish */}
                      <Animation
                        target={`[data-id-icon="${i}"]`}
                        start={s + 3}
                        end={s + 7}
                        fromTo={[{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'power2.in' }]}
                      >
                        <div data-id-icon={i} className="inline-block text-parchment-ink/85">
                          <card.icon className="h-11 w-11" />
                        </div>
                      </Animation>

                      {/* kicker stamps in before the writing starts */}
                      <Animation target={`[data-id-kicker="${i}"]`} start={s + 4} end={s + 6} fromTo={[{ scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, ease: 'power4.in' }]}>
                        <p data-id-kicker={i} className="mt-6 font-mono text-kicker uppercase tracking-[0.24em] text-wine-700">
                          Identity {`0${i + 1}`}
                        </p>
                      </Animation>

                      <h3 className="display mt-4 min-h-[2.6em] text-[clamp(1.6rem,2.8vw,2.3rem)] leading-[1.12]" >
                        <Typed id={`i${i}t`} text={card.title} unit="char" cursor />
                      </h3>

                      <p className="mt-4 max-w-[62ch] font-serif text-base leading-relaxed text-parchment-ink/80 sm:text-lg">
                        <Typed id={`i${i}b`} text={card.body} unit="word" cursor />
                      </p>

                      {/* the wax dot presses once the plate is written */}
                      <Animation target={`[data-id-stamp="${i}"]`} start={s + 22} end={s + 24} fromTo={[{ scale: 1.7, opacity: 0 }, { scale: 1, opacity: 1, ease: 'power4.in' }]}>
                        <span data-id-stamp={i} aria-hidden="true" className="absolute bottom-8 right-8 block h-2 w-2 rounded-full bg-wine-600/80" />
                      </Animation>
                    </article>

                    {/* the plate lifts away for the next one — a slight
                        turn, like a page lifting off the desk */}
                  {i < IDENTITIES.length - 1 && (
                    <Animation target={`[data-id-plate="${i}"]`} start={s + 26} end={s + 29} fromTo={[{ y: 0, opacity: 1, rotation: 0 }, { y: -36, opacity: 0, rotation: -1.2, ease: 'power1.in', immediateRender: false }]} />
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
