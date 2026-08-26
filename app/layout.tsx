import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { SmoothScroll } from '@/lib/motion'
import { LivingGrain } from '@/components/living-grain'
import { DebugHud } from '@/components/debug-hud'
import './globals.css'

/*
 * Self-hosted faces (next/font/local). Recovered from the production build's
 * own media output so the build no longer depends on reaching Google Fonts —
 * same families, same CSS variables as before.
 */
const imFell = localFont({
  src: [
    { path: './fonts/im-fell-english-regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/im-fell-english-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-im-fell',
  display: 'swap',
})

const sourceSerif = localFont({
  src: './fonts/source-serif-4-variable.woff2',
  variable: '--font-source-serif',
  display: 'swap',
})

const jetbrainsMono = localFont({
  src: './fonts/jetbrains-mono-variable.woff2',
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const kaushan = localFont({
  src: './fonts/kaushan-script-400.woff2',
  weight: '400',
  variable: '--font-kaushan',
  display: 'swap',
})

const TITLE = 'Eskolx Labs · Good Soil. Great Minds. Abundant Impact.'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: TITLE,
  description:
    'Open-source statistical infrastructure and package development. We translate theoretical mathematical formulas into modular, open-source Python automation tools built from scratch.',
  openGraph: {
    type: 'website',
    siteName: 'Eskolx Labs',
    title: TITLE,
    description:
      'Open-source statistical infrastructure and package development, built from scratch in pure Python.',
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description:
      'Open-source statistical infrastructure and package development, built from scratch in pure Python.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ece1c6',
}

const CONTRACT = `<!--
DIRECTION CONTRACT - The Eskolx Almanac (seed key 839e0b7c)
THESIS: one almanac in two fields, a parchment day-spread and a loam
night-spread, where every statistic is a measured entry in a seasonal
table and the 3-month cohort is the year turning; refuses the dark-SaaS
hero-plus-cards arrangement.
OWN-WORLD: two animated fields (parchment #ece1c6 / loam #241407)
carried on body via --field-*; wine grape family for fruit and major
fields; gold-leaf for rules and foliage; vermilion held for the single
Join action on every spread; IM Fell English display over Source Serif
body; brush-script wordmark with vermilion seal, hairline rules, corner
ticks, hatched shading, print-tooth grain.
STORY: a builder opens the almanac at the day-spread, reads the mission
as the year's entry, scrolls through pinned scenes where the page flips
to the night-spread and back, watches the four-tier trellis and the
three-month method advance with the scroll, and joins GitHub or Telegram
at the harvest table.
FIRST VIEWPORT: parchment day-spread; giant serif headline "Good soil.
Great minds. Abundant impact." with "Abundant" in wine italic rising in
on load; the single vermilion seal stamps mid-pin; a scroll cue at the
foot.
FORM: the Observatory Almanac, the pick card of the direction roll (seed
839e0b7c), chosen over the assigned Illuminated Codex; raised by declined
challengers: one-law generation (rain-garden), no empty fields (gallery
panel), one vermilion band (street poster).
FINISH: unreviewed and undocumented is unfinished; this build ends with
the finish review, the verdict, DESIGN.md, and every shipping raster
carrying its provenance.
-->`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${imFell.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} ${kaushan.variable}`}
    >
      <body className="grain antialiased">
        <div dangerouslySetInnerHTML={{ __html: CONTRACT }} style={{ display: 'none' }} />
        <SmoothScroll>{children}</SmoothScroll>
        <LivingGrain />
        <DebugHud />
      </body>
    </html>
  )
}
