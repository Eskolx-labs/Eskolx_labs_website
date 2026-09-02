import Link from 'next/link'
import { GithubIcon, TelegramIcon } from '@/components/brand-icons'

/* the leaf that was never bound. Static export writes this as 404.html;
   it renders outside every Root zone, so it keeps the day palette's
   default field vars and asks for no scroll machinery. */
export default function NotFound() {
  return (
    <main className="grain field-bg flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-kicker uppercase tracking-label text-[color:var(--field-ink-soft)]">
        404 · Page not found
      </p>
      <h1 className="display mt-5 max-w-xl text-[clamp(2rem,5vw,3.2rem)] leading-tight text-[color:var(--field-ink)]">
        This page isn&apos;t here.
      </h1>
      <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-[color:var(--field-ink-soft)]">
        The address wore out, or the page was never written. The rest of the
        site is one turn away.
      </p>
      <div className="mt-9 flex flex-col items-center gap-3.5 sm:flex-row">
        <Link href="/" className="btn-plate btn-wine">
          Back to the homepage
        </Link>
        <a
          href="https://github.com/eskolx-labs"
          target="_blank"
          rel="noreferrer"
          className="btn-plate btn-outline"
        >
          <GithubIcon className="h-4 w-4" />
          Explore the repos
        </a>
        <a
          href="https://t.me/eskolx_labs"
          target="_blank"
          rel="noreferrer"
          className="btn-plate btn-outline"
        >
          <TelegramIcon className="h-4 w-4" />
          Join the Community
        </a>
      </div>
    </main>
  )
}
