'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GithubIcon, TelegramIcon } from '@/components/brand-icons'
import { SealMark } from '@/components/botanical/seal-mark'

const NAV_LINKS = [
  { label: 'Eshcol', gloss: 'Name & roots', href: '#ecosystem' },
  { label: 'Trellis', gloss: 'Curriculum', href: '#tiers' },
  { label: 'Method', gloss: 'The plan', href: '#roadmap' },
  { label: 'Keepers', gloss: 'The team', href: '#leadership' },
  { label: 'Harvest', gloss: 'Community', href: '#community' },
  { label: 'Guide', gloss: 'Joining & FAQ', href: '#fieldguide' },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const [grounded, setGrounded] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [resizeTick, setResizeTick] = useState(0)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const sealRef = useRef<HTMLSpanElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const markerRef = useRef<HTMLSpanElement>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

  // Esc closes the menu, focus stays inside the header while it's open
  // (trap), the page behind doesn't scroll, and focus returns to the toggle.
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const scope = headerRef.current
    if (!scope) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const toggle = toggleRef.current
    const focusables = () =>
      Array.from(scope.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter(
        el => el.offsetParent !== null,
      )
    focusables()[0]?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables()
      if (items.length === 0) return
      const firstEl = items[0]
      const lastEl = items[items.length - 1]
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault()
        firstEl.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      toggle?.focus()
    }
  }, [open])

  useEffect(() => {
    let raf = 0
    // section tops are geometry, not per-event work: measured here and on
    // the events that can shift them, never inside the scroll handler
    let tops: Array<[string, number]> = []
    const measure = () => {
      tops = NAV_LINKS.map((link) => {
        const el = document.getElementById(link.href.slice(1))
        return [
          link.href.slice(1),
          el ? el.getBoundingClientRect().top + window.scrollY : Number.POSITIVE_INFINITY,
        ]
      })
    }
    const evaluate = () => {
      raf = 0
      setGrounded(window.scrollY > 24)
      // the reader's place: the last spread whose top has crossed the
      // upper-third reading line owns the rail's gold mark
      const probe = window.scrollY + window.innerHeight * 0.38
      let current: string | null = null
      for (const [id, top] of tops) {
        if (top <= probe) current = id
      }
      setActiveId(current)
    }
    // scroll storms coalesce to one evaluation per frame
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(evaluate)
    }
    const remeasure = () => {
      measure()
      schedule()
    }
    const onResize = () => {
      setResizeTick((t) => t + 1)
      remeasure()
    }
    measure()
    evaluate()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('load', remeasure)
    document.fonts?.ready.then(remeasure)
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.addEventListener('refresh', remeasure)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', remeasure)
      ScrollTrigger.removeEventListener('refresh', remeasure)
    }
  }, [])

  // the gold mark slides under the active link; measured from real rects so
  // font swaps and resizes stay honest (recomputed on resize via tick)
  useLayoutEffect(() => {
    const mark = markerRef.current
    if (!mark) return
    const nav = mark.parentElement
    const link = activeId ? linkRefs.current[activeId] : null
    if (!nav || !link || !activeId) {
      mark.style.opacity = '0'
      return
    }
    const lr = link.getBoundingClientRect()
    const nr = nav.getBoundingClientRect()
    mark.style.opacity = '1'
    mark.style.transform = `translateX(${lr.left - nr.left}px) scaleX(${lr.width / 24})`
  }, [activeId, resizeTick])

  // Desktop, motion-permitting: the hero's giant wordmark docks onto this
  // rail slot, so the real logo stays hidden until the dock completes and
  // then crossfades in pixel-aligned. The seal turns slowly with the read.
  useEffect(() => {
    const mm = gsap.matchMedia()
    // the dock needs a tall pinned hero to dock within; short windows read
    // the flow layout, where the logo simply stays visible in the rail
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px) and (min-height: 700px)', () => {
      gsap.registerPlugin(ScrollTrigger)
      const ctx = gsap.context(() => {
        gsap.set(logoRef.current, { autoAlpha: 0 })
        gsap.to(logoRef.current, {
          autoAlpha: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#top',
            start: '42% top',
            end: '52% top',
            scrub: true,
          },
        })
        gsap.fromTo(
          sealRef.current,
          { rotate: 0 },
          {
            rotate: 180,
            ease: 'none',
            scrollTrigger: {
              trigger: document.body,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          },
        )
        // the almanac's reading rule: one gold hairline fills as the book is read
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: document.body,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          },
        )
        // one vermilion per spread: the rail's CTA holds back while the
        // hero's is on stage, then takes over as the hero exits
        gsap.set(ctaRef.current, { autoAlpha: 0 })
        gsap.to(ctaRef.current, {
          autoAlpha: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#top',
            start: '40% bottom',
            end: '60% bottom',
            scrub: true,
          },
        })
      })
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        grounded
          ? 'border-b border-[color-mix(in_srgb,var(--field-line)_35%,transparent)] bg-[color-mix(in_srgb,var(--field-bg)_86%,transparent)] backdrop-blur-md max-lg:bg-[color-mix(in_srgb,var(--field-bg)_97%,transparent)] max-lg:backdrop-blur-none'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          ref={logoRef}
          href="#top"
          className="group flex origin-left items-center gap-2.5"
        >
          <span className="font-script text-[1.5rem] leading-none text-[color:var(--field-ink)]">
            Eskolx Labs
          </span>
          <span ref={sealRef} className="inline-flex shrink-0">
            <SealMark className="h-7 w-7" />
          </span>
        </a>

        <nav className="relative hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => {
            const id = link.href.slice(1)
            const active = activeId === id
            return (
              <a
                key={link.label}
                href={link.href}
                ref={el => { linkRefs.current[id] = el }}
                aria-current={active ? 'true' : undefined}
                className={`group block py-0.5 text-center transition-colors ${
                  active
                    ? 'text-[color:var(--field-ink)]'
                    : 'text-[color:var(--field-ink-soft)] hover:text-[color:var(--field-ink)]'
                }`}
              >
                <span className="block font-serif text-[15px] leading-tight underline-offset-8 group-hover:underline group-hover:decoration-gold-leaf/70">
                  {link.label}
                </span>
                <span
                  className={`mt-0.5 block font-mono text-[11px] leading-none uppercase tracking-[0.12em] ${
                    active ? 'opacity-80' : 'opacity-45'
                  }`}
                >
                  {link.gloss}
                </span>
              </a>
            )
          })}
          {/* the reader's mark: one gold hairline travels the rail as spreads turn */}
          <span
            ref={markerRef}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[2px] left-0 h-[2px] w-6 bg-gold-leaf opacity-0 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transformOrigin: 'left center' }}
          />
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 lg:flex">
          <a
            href="https://t.me/eskolx_labs"
            target="_blank"
            rel="noreferrer"
            aria-label="Join the Telegram community"
            className={`flex h-11 w-11 items-center justify-center rounded-sm border transition-colors ${
              grounded
                ? 'border-[color-mix(in_srgb,var(--field-ink)_30%,transparent)] text-[color:var(--field-ink)] hover:border-[color:var(--field-ink)]'
                : 'border-[color-mix(in_srgb,var(--field-ink)_30%,transparent)] text-[color:var(--field-ink)] hover:border-[color:var(--field-ink)]'
            }`}
          >
            <TelegramIcon className="h-4 w-4" />
          </a>
          <a
            ref={ctaRef}
            href="https://github.com/eskolx-labs"
            target="_blank"
            rel="noreferrer"
            className="btn-plate btn-wine hidden !px-5 !py-2.5 text-[15px] sm:inline-flex"
          >
            <GithubIcon className="h-4 w-4" />
            Eskolx on GitHub
          </a>
        </div>

        <button
          type="button"
          ref={toggleRef}
          onClick={() => setOpen((v) => !v)}
            className={`inline-flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-sm text-[color:var(--field-ink)] lg:hidden`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span
            className={`h-px w-6 bg-current transition-transform duration-200 ${open ? 'translate-y-[6px] rotate-45' : ''}`}
          />
          <span
            className={`h-px w-6 bg-current transition-opacity duration-200 ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`h-px w-6 bg-current transition-transform duration-200 ${open ? '-translate-y-[6px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-[color-mix(in_srgb,var(--field-line)_40%,transparent)] bg-[color-mix(in_srgb,var(--field-bg)_100%,transparent)] lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between border-b border-[color-mix(in_srgb,var(--field-line)_30%,transparent)] py-3 font-serif text-[color:var(--field-ink)] last:border-0 hover:opacity-75"
              >
                <span>{link.label}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] opacity-50">{link.gloss}</span>
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-3 pb-2">
              <a
                href="https://github.com/eskolx-labs"
                target="_blank"
                rel="noreferrer"
                className="btn-plate btn-wine"
              >
                <GithubIcon className="h-4 w-4" />
                Eskolx on GitHub
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
          </nav>
        </div>
      )}

      {/* the reading rule: fills as the book is read */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gold-leaf"
      />
    </header>
  )
}
