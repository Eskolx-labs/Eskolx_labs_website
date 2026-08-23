'use client'

import { Root, Animation } from '@/lib/scrollytelling'
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
    handle: 'github.com/eskolx-labs',
    desc: 'Open-source repositories & codebase docs',
    href: 'https://github.com/eskolx-labs',
  },
  {
    icon: TelegramIcon,
    name: 'Telegram',
    handle: 't.me/eskolx_labs',
    desc: 'Community chat & builder updates',
    href: 'https://t.me/eskolx_labs',
  },
  {
    icon: LinkedinIcon,
    name: 'LinkedIn',
    handle: 'linkedin.com/company/eskolx_labs',
    desc: 'Technical announcements & talent recruitment',
    href: 'https://linkedin.com/company/eskolx_labs',
  },
]

const SECONDARY = [
  { icon: YoutubeIcon, name: 'YouTube', href: 'https://youtube.com/@eskolx_labs' },
  { icon: XIcon, name: 'Twitter / X', href: 'https://x.com/eskolx_labs' },
  { icon: InstagramIcon, name: 'Instagram', href: 'https://instagram.com/eskolx_labs' },
  { icon: FacebookIcon, name: 'Facebook', href: 'https://facebook.com/eskolx.labs' },
  { icon: TiktokIcon, name: 'TikTok', href: 'https://tiktok.com/@eskolx_labs' },
]

const DRIFT = [-18, -36, -54] // yPercent per card across the full transit

export function Community() {
  return (
    <Root
      id="community"
      start="top bottom"
      end="bottom top"
      className="relative bg-parchment py-24"
      field={{
        from: { bg: '#241407', ink: '#f0e4c8', soft: '#b8a284', line: '#5a4227' },
        to: { bg: '#ece1c6', ink: '#29190c', soft: '#5c4a33', line: '#b9a67f' },
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Animation target="[data-harvest-head]" start={6} end={94} fromTo={[{ y: 34 }, { y: -22 }]}>
          <div data-harvest-head className="max-w-3xl">
            <h2 className="display text-[clamp(2rem,3.8vw,3.2rem)] leading-tight text-parchment-ink">
              The harvest table
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-parchment-ink/75">
              Follow the code, the research, and the conversation across every
              channel.
            </p>
          </div>
        </Animation>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PRIMARY.map((c, i) => (
            <a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-sm border border-parchment-ink/25 bg-parchment p-7 transition-colors duration-200 hover:border-wine-500/50"
            >
              <Animation
                target={`[data-drift="${i}"]`}
                start={0}
                end={100}
                fromTo={[{ yPercent: 0 }, { yPercent: DRIFT[i] }]}
              >
                <div data-drift={i}>
                  <Animation
                    target={`[data-harvest="${i}"]`}
                    start={i * 12 + 8}
                    end={i * 12 + 32}
                    fromTo={[{ y: 30, opacity: 0 }, { y: 0, opacity: 1 }]}
                  >
                    <div data-harvest={i}>
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-parchment-ink/30 text-parchment-ink transition-colors duration-200 group-hover:border-wine-500 group-hover:bg-wine-600 group-hover:text-cream-100">
                        <c.icon className="h-5 w-5" />
                      </span>
                      <h3 className="display mt-5 text-xl text-parchment-ink">{c.name}</h3>
                      <p className="mt-1 font-mono text-xs tracking-wide text-wine-600">{c.handle}</p>
                      <p className="mt-3 text-[15px] leading-relaxed text-parchment-ink/75">{c.desc}</p>
                    </div>
                  </Animation>
                </div>
              </Animation>
            </a>
          ))}
        </div>

        <Reveal className="mt-6">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-5" data-reveal-item>
          {SECONDARY.map((c) => (
            <li key={c.name}>
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-sm border border-parchment-ink/25 bg-parchment px-4 py-4 transition-colors duration-200 hover:border-gold-leaf/60"
              >
                <c.icon className="h-[18px] w-[18px] shrink-0 text-parchment-ink/60" />
                <span className="truncate font-serif text-sm text-parchment-ink/85">{c.name}</span>
              </a>
            </li>
          ))}
          </ul>
        </Reveal>

        <Reveal className="mt-10" y={22}>
          <a
            href="https://t.me/eskolx_labs"
            target="_blank"
            rel="noreferrer"
            className="btn-plate btn-wine"
            data-reveal-item
          >
            <TelegramIcon className="h-5 w-5" />
            Join the community on Telegram
          </a>
        </Reveal>
      </div>
    </Root>
  )
}
