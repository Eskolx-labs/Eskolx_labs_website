'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GithubIcon, TelegramIcon } from '@/components/brand-icons'
import { SealMark } from '@/components/botanical/seal-mark'

const NAV_LINKS = [
  { label: 'Eshcol', href: '#ecosystem' },
  { label: 'Trellis', href: '#tiers' },
  { label: 'Method', href: '#roadmap' },
  { label: 'Keepers', href: '#leadership' },
  { label: 'Harvest', href: '#community' },
  { label: 'Guide', href: '#fieldguide' },
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

  // Esc closes the mobile menu and returns focus to the toggle
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    const onScroll = () => {
      setGrounded(window.scrollY > 24)
      // the reader's place: the last spread whose top has crossed the
      // upper-third reading line owns the rail's gold mark
      const probe = window.scrollY + window.innerHeight * 0.38
      let current: string | null = null
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.href.slice(1))
        if (el && el.offsetTop <= probe) current = link.href.slice(1)
      }
      setActiveId(current)
    }
    const onResize = () => setResizeTick(t => t + 1)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
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
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        grounded
          ? 'border-b border-[color-mix(in_srgb,var(--field-line)_35%,transparent)] bg-[color-mix(in_srgb,var(--field-bg)_86%,transparent)] backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          ref={logoRef}
          href="#top"
          className="group flex origin-left items-center gap-2.5"
        >
          <span
            className={`font-script text-[1.5rem] leading-none ${
              grounded ? 'text-[color:var(--field-ink)]' : 'text-parchment-ink'
            }`}
          >
            Eskolx Labs
          </span>
          <span ref={sealRef} className="inline-flex shrink-0">
            <SealMark className="h-7 w-7" />
          </span>
        </a>

        <nav className="relative hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const id = link.href.slice(1)
            const active = activeId === id
            return (
              <a
                key={link.label}
                href={link.href}
                ref={el => { linkRefs.current[id] = el }}
                aria-current={active ? 'true' : undefined}
                className={`py-0.5 font-serif text-[15px] underline-offset-8 transition-colors hover:underline hover:decoration-gold-leaf/70 ${
                  grounded
                    ? active
                      ? 'text-[color:var(--field-ink)]'
                      : 'text-[color:var(--field-soft)] hover:text-[color:var(--field-ink)]'
                    : active
                      ? 'text-parchment-ink'
                      : 'text-parchment-ink/75 hover:text-parchment-ink'
                }`}
              >
                {link.label}
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

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://t.me/eskolx_labs"
            target="_blank"
            rel="noreferrer"
            aria-label="Join the Telegram community"
            className={`flex h-10 w-10 items-center justify-center rounded-sm border transition-colors ${
              grounded
                ? 'border-[color-mix(in_srgb,var(--field-ink)_30%,transparent)] text-[color:var(--field-ink)] hover:border-[color:var(--field-ink)]'
                : 'border-parchment-ink/30 text-parchment-ink hover:border-parchment-ink'
            }`}
          >
            <TelegramIcon className="h-4 w-4" />
          </a>
          <a
            ref={ctaRef}
            href="https://github.com/eskolx-labs"
            target="_blank"
            rel="noreferrer"
            className="btn-plate btn-wine !px-5 !py-2.5 text-[15px]"
          >
            <GithubIcon className="h-4 w-4" />
            Explore GitHub
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-sm ${
            grounded ? 'text-[color:var(--field-ink)]' : 'text-parchment-ink'
          } lg:hidden`}
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
        <div className="border-t border-[color-mix(in_srgb,var(--field-line)_40%,transparent)] bg-[color-mix(in_srgb,var(--field-bg)_95%,transparent)] backdrop-blur-md lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-[color-mix(in_srgb,var(--field-line)_30%,transparent)] py-3 font-serif text-[color:var(--field-ink)] last:border-0 hover:opacity-75"
              >
                {link.label}
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
                Explore GitHub
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
