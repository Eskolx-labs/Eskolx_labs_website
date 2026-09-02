'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Root, Animation } from '@/lib/scrollytelling'
import { LOAM, PARCHMENT } from '@/lib/field-controller'
import { Reveal } from '@/components/reveal'
import {
  GithubIcon,
  TelegramIcon,
  LinkedinIcon,
  YoutubeIcon,
  XIcon,
  InstagramIcon,
  FacebookIcon,
  TiktokIcon,
} from '@/components/brand-icons'

const PRIMARY = [
  {
    icon: GithubIcon,
    name: 'GitHub',
    cta: 'Open GitHub',
    handle: 'github.com/eskolx-labs',
    desc: 'Open-source repositories & codebase docs',
    href: 'https://github.com/eskolx-labs',
  },
  {
    icon: TelegramIcon,
    name: 'Telegram',
    cta: 'Open Telegram',
    handle: 't.me/eskolx_labs',
    desc: 'Community chat & builder updates',
    href: 'https://t.me/eskolx_labs',
  },
  {
    icon: LinkedinIcon,
    name: 'LinkedIn',
    cta: 'Open LinkedIn',
    handle: 'linkedin.com/company/eskolx-labs',
    desc: 'Technical announcements & talent recruitment',
    href: 'https://www.linkedin.com/company/eskolx-labs/',
  },
]

const SECONDARY = [
  { icon: YoutubeIcon, name: 'YouTube', href: 'https://youtube.com/@eskolx_labs' },
  { icon: XIcon, name: 'Twitter / X', href: 'https://x.com/eskolx_labs' },
  { icon: InstagramIcon, name: 'Instagram', href: 'https://instagram.com/eskolx_labs' },
  { icon: FacebookIcon, name: 'Facebook', href: 'https://facebook.com/eskolx.labs' },
  { icon: TiktokIcon, name: 'TikTok', href: 'https://tiktok.com/@eskolx_labs' },
]

// brand glyphs fill their viewBoxes differently: telegram's disc and
// linkedin's slab run edge-to-edge while the octocat carries its own
// padding — optically corrected so every chip holds the same visual weight
function iconSize(name: string) {
  return name === 'Telegram' || name === 'LinkedIn' ? 'h-[17px] w-[17px]' : 'h-5 w-5'
}

export function Community() {
  const stageRef = useRef<HTMLDivElement>(null)

  // The harvest table is the last chapter before a short footer, so its Root
  // timeline's tail can fall past the document's final scroll position —
  // beats scheduled late there strand. Each plate therefore owns a small,
  // viewport-relative trigger (the nav-CTA pattern): the leftmost card
  // leads and its neighbours cascade as their own boxes cross the same
  // threshold, so the stagger reads left-to-right and always completes.
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
      const stage = stageRef.current
      if (!stage) return
      gsap.registerPlugin(ScrollTrigger)
      const ctx = gsap.context(() => {
        const rule = stage.querySelector('[data-harvest-rule]')
        if (rule) {
          gsap.fromTo(
            rule,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'power2.inOut',
              scrollTrigger: { trigger: rule, start: 'top 92%', end: 'top 78%', scrub: 0.3 },
            },
          )
        }
        PRIMARY.forEach((c, i) => {
          const card = stage.querySelector(`[data-harvest="${i}"]`)
          if (!card) return
          const chip = card.querySelector(`[data-chip="${i}"]`)
          const index = card.querySelector(`[data-index="${i}"]`)
          // the row shares one baseline, so the cascade comes purely from
          // threshold offsets — and a higher viewport-% fires earlier,
          // hence the leftmost plate gets the largest one and leads.
          const lead = (PRIMARY.length - 1 - i) * 7
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card.closest('a') ?? card,
              start: `top ${88 + lead}%`,
              end: `top ${60 + lead}%`,
              scrub: 0.3,
            },
          })
          tl.fromTo(
            card,
            { y: 36, opacity: 0, rotate: -1 },
            { y: 0, opacity: 1, rotate: 0, ease: 'back.out(1.2)', duration: 0.5 },
          )
          if (chip) {
            // the chip stamps AFTER the card settles — a stamp landing on
            // a still-rising card reads as noise, not ink
            tl.fromTo(
              chip,
              { scale: 1.55, opacity: 0 },
              { scale: 1, opacity: 1, ease: 'power3.in', duration: 0.25 },
              '>-0.05',
            )
          }
          if (index) {
            tl.fromTo(
              index,
              { opacity: 0, rotate: 8 },
              { opacity: 1, rotate: 0, ease: 'power2.out', duration: 0.2 },
              '>-0.1',
            )
          }
        })
      }, stage)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  return (
    <>
    <Root
      id="community"
      start="top bottom"
      end="bottom top"
      className="relative py-24"
      field={{ from: LOAM, to: LOAM }}
    >
      <div ref={stageRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Animation target="[data-harvest-head]" start={6} end={94} fromTo={[{ y: 34 }, { y: -22 }]}>
          <div data-harvest-head className="max-w-3xl">
            <h2 className="display text-[clamp(2rem,3.8vw,3.2rem)] leading-tight field-ink">
              Community Channels
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[color-mix(in_srgb,var(--field-ink)_75%,transparent)]">
              Follow the code, the research, and the conversation across every
              channel.
            </p>
          </div>
        </Animation>

        <div data-harvest-rule className="mt-12 h-px origin-left bg-[color-mix(in_srgb,var(--field-ink)_25%,transparent)]" />

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {PRIMARY.map((c, i) => (
            <a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-sm border border-parchment-ink/25 bg-parchment transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1.5 hover:rotate-[0.4deg] hover:border-wine-500/60 hover:shadow-[0_22px_48px_-24px_rgb(0_0_0/0.4)]"
            >
              <div data-harvest={i} className="flex flex-1 flex-col p-7">
                <div className="flex items-start justify-between">
                  <span
                    data-chip={i}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-parchment-ink/30 text-parchment-ink transition-all duration-300 group-hover:-rotate-6 group-hover:border-wine-500 group-hover:bg-wine-600 group-hover:text-cream-100"
                  >
                    <c.icon className={iconSize(c.name)} />
                  </span>
                  <span
                    data-index={i}
                    aria-hidden="true"
                    className="mt-1.5 font-mono text-kicker uppercase tracking-[0.3em] text-parchment-ink/45"
                  >
                    No.{i + 1}
                  </span>
                </div>
                <h3 className="display mt-5 text-2xl leading-snug text-parchment-ink">{c.name}</h3>
                <p className="mt-1 font-mono text-xs tracking-wide text-wine-600">{c.handle}</p>
                <p className="mt-3 text-copy leading-relaxed text-parchment-ink/75">{c.desc}</p>
                <div className="mt-auto pt-6">
                  <span className="inline-flex items-center gap-2 font-mono text-kicker uppercase tracking-[0.28em] text-parchment-ink/55 transition-colors duration-200 group-hover:text-wine-600">
                    {c.cta}
                    <svg
                      viewBox="0 0 14 14"
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                      fill="none"
                    >
                      <path d="M3 11 L11 3 M5 3 H11 V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <Reveal className="mt-6" end="top 70%">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[color-mix(in_srgb,var(--field-ink)_70%,transparent)]" data-reveal-item>
            <span className="font-mono text-kicker uppercase tracking-label text-[color-mix(in_srgb,var(--field-ink)_55%,transparent)]">Also on</span>
            {SECONDARY.map((c, i) => (
              <span key={c.name} className="font-serif text-[color-mix(in_srgb,var(--field-ink)_80%,transparent)]">
                {i > 0 && <span aria-hidden="true"> · </span>}
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-draw transition-colors hover:text-wine-400"
                >
                  {c.name}
                </a>
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </Root>

    {/* the harvest's dawn: night holds through the keepers and the harvest;
        this seam hands the field back to paper before the practicalities */}
    <Root
      id="harvest-dawn"
      className="relative flex h-[28vh] items-center justify-center bg-loam-950 md:h-[55vh]"
      start="top bottom"
      end="bottom top"
      field={{ from: LOAM, to: PARCHMENT }}
    >
      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="h-1 w-1 rounded-full bg-gold-leaf/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-wine-500/80" />
        <span className="h-1 w-1 rounded-full bg-gold-leaf/70" />
      </div>
    </Root>
    </>
  )
}
