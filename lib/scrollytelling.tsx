'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { registerZone, removeZone } from '@/lib/field-controller'

/*
 * Scrollytelling primitives in the basement.studio pattern:
 * one scrubbed timeline per section, normalized to 0-100, where children
 * claim absolute start/end positions instead of durations. Every tween is
 * killed and the timeline reverted on unmount.
 *
 * Field turns: a Root may carry a `field` pair; the field controller scrubs
 * the page's two almanac fields continuously across the section's travel
 * (minimal-goods pattern), so the color is always mid-turn while the chapter
 * changes and settled between chapters.
 */

type Field = {
  from: { bg: string; ink: string; soft: string; line: string }
  to: { bg: string; ink: string; soft: string; line: string }
  /** confine the turn to a sub-range of the section's window (0-1):
      the seams-only contract — hold settled while content reads */
  turnAt?: [number, number]
}

type ScrollytellingContextValue = {
  timeline: gsap.core.Timeline | null
  scoped: (selector: string) => Element[] | null
  getSpace: (start: number, end: number) => { duration: number; position: number }
}

const ScrollytellingContext = createContext<ScrollytellingContextValue | null>(null)

export function useScrollytelling() {
  const ctx = useContext(ScrollytellingContext)
  if (!ctx) throw new Error('useScrollytelling must be used within <Scrollytelling.Root>')
  return ctx
}

type RootProps = {
  children: ReactNode
  start?: string
  end?: string
  scrub?: boolean | number
  field?: Field
  className?: string
  id?: string
  mobilePins?: boolean
}

export function Root({
  children,
  start = 'top top',
  end = 'bottom bottom',
  scrub = true,
  field,
  className,
  id,
  mobilePins = false,
}: RootProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null)

  // the field zone registers on every path — reduced motion, phones, flow —
  // so the nav tints with the chapter everywhere
  useEffect(() => {
    const el = ref.current
    if (!el || !field) return
    const zoneId = `zone-${id ?? Math.random().toString(36).slice(2, 8)}`
      registerZone({
        id: zoneId,
        el,
        from: field.from,
        to: field.to,
        turnAt: field.turnAt,
        pinned: !!el.querySelector('[data-pin]'),
      })
    return () => removeZone(zoneId)
  }, [field, id])

  // the scrubbed timeline is resize-reactive: gsap.matchMedia re-evaluates
  // the bands on every crossing, so a desktop window resized down to a
  // quarter tile rebuilds the book for the shell it actually has, instead
  // of keeping the timeline it was loaded with. Bands mirror the CSS guard
  // in globals.css: flow chapters scrub at every size that is not tiny;
  // pinned scenes need real shell height unless they opted into the tier.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add(
      {
        // bounds come in fractional pairs (700/699.99, 768/767.99,
        // 500/499.99) so zoomed or scaled viewports reporting heights like
        // 699.5 always match exactly one band — integer pairs left whole
        // pixel ranges where nothing built and every pin froze solid
        desktop: '(min-width: 768px) and (min-height: 700px)',
        smallDesktop: '(min-width: 768px) and (min-height: 500px) and (max-height: 699.9px)',
        portraitMobile: '(max-width: 767.9px) and (min-height: 500px)',
        tiny: '(max-height: 499.9px)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (ctx) => {
        const { desktop, smallDesktop, portraitMobile, tiny, reduce } = ctx.conditions as Record<
          string,
          boolean
        >
        const pinnedNow = !!el.querySelector('[data-pin]')
        const shouldBuild =
          !reduce &&
          !tiny &&
          (desktop ||
            (smallDesktop && (!pinnedNow || mobilePins)) ||
            // portrait phones: flow chapters scrub too — their timelines are
            // viewport-crossing and need no shell height. Only pinned rooms
            // without a tier room stay flow there.
            (portraitMobile && (!pinnedNow || mobilePins)))
        if (!shouldBuild) return
        gsap.registerPlugin(ScrollTrigger)

        // Flow chapters configured as "top bottom"/"bottom top" own their
        // whole viewport crossing: the natural string-form span is element
        // height + viewport, which is what makes bands like the seed-catalog
        // marquee read letter by letter. But a chapter that sits last before
        // a short footer can never scroll its bottom to the viewport top, so
        // we clamp the span to the document's last scroll position —
        // mid-page chapters keep the full crossing, the final one simply
        // completes at book close.
        const pinned = pinnedNow
        const flowTransit = !pinned && start === 'top bottom' && end === 'bottom top'
        const tl = gsap.timeline({
          paused: true,
          defaults: { duration: 1, ease: 'linear' },
          scrollTrigger: {
            trigger: el,
            start,
            end: pinned
              ? () => `+=${el.offsetHeight - window.innerHeight}`
              : flowTransit
                ? () => {
                    const rect = el.getBoundingClientRect()
                    const startPx = rect.top + window.scrollY - window.innerHeight
                    const natural = el.offsetHeight + window.innerHeight
                    const reachable =
                      document.documentElement.scrollHeight - window.innerHeight - startPx
                    return `+=${Math.max(Math.min(natural, reachable), 1)}`
                  }
                : end,
            scrub,
          },
        })
        // the beat contract is a 0-100 band: pin the timeline's duration
        // there even when children end early, or a section whose last tween
        // stops at 20 compresses every window fivefold
        tl.set({}, {}, 100)
        setTimeline(tl)
        return () => {
          tl.revert()
          setTimeline(null)
        }
      },
    )
    return () => mm.revert()
  }, [start, end, scrub, id, mobilePins])

  const scoped = (selector: string) => {
    if (selector.startsWith('body ')) return Array.from(document.querySelectorAll(selector))
    const el = ref.current
    if (!el) return null
    return Array.from(el.querySelectorAll(selector))
  }

  const getSpace = (start: number, end: number) => ({
    duration: end - start,
    position: start,
  })

  return (
    <ScrollytellingContext.Provider value={{ timeline, scoped, getSpace }}>
      <div ref={ref} id={id} className={className}>
        {children}
      </div>
    </ScrollytellingContext.Provider>
  )
}

type AnimationProps = {
  start?: number
  end?: number
  to?: gsap.TweenVars
  fromTo?: [gsap.TweenVars, gsap.TweenVars]
  target?: string
  children?: ReactNode
  className?: string
}

export function Animation({
  start = 0,
  end = 100,
  to,
  fromTo,
  target,
  children,
  className,
}: AnimationProps) {
  const { timeline, scoped, getSpace } = useScrollytelling()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!timeline) return
    const targets = target ? scoped(target) : ref.current ? [ref.current] : null
    if (!targets || targets.length === 0) return
    const { duration, position } = getSpace(start, end)
    const tween = to
      ? gsap.to(targets, { ...to, duration, ease: (to as { ease?: string }).ease ?? 'linear' })
      : gsap.fromTo(targets, fromTo![0], {
          ...fromTo![1],
          duration,
          ease: (fromTo![1] as { ease?: string }).ease ?? 'linear',
        })
    timeline.add(tween, position)
    return () => {
      tween.kill()
    }
  }, [timeline, start, end, to, fromTo, target, scoped, getSpace])

  if (children) {
    if (target) return <>{children}</>
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }
  return null
}

type WaypointProps = {
  at: number
  tween: {
    target: string
    to?: gsap.TweenVars
    fromTo?: [gsap.TweenVars, gsap.TweenVars]
    duration?: number
  }
  children?: ReactNode
}

export function Waypoint({ at, tween, children }: WaypointProps) {
  const { timeline, scoped } = useScrollytelling()

  useEffect(() => {
    if (!timeline) return
    const targets = scoped(tween.target)
    if (!targets || targets.length === 0) return
    const duration = tween.duration ?? 0.001
    const t = tween.to
      ? gsap.to(targets, { ...tween.to, duration, ease: 'power1.inOut' })
      : gsap.fromTo(targets, tween.fromTo![0], { ...tween.fromTo![1], duration, ease: 'power1.inOut' })
    timeline.add(t, at)
    return () => {
      t.kill()
    }
  }, [timeline, at, tween, scoped])

  return children ? <>{children}</> : null
}

type PinProps = {
  height: string
  /** shorter room for phones; only meaningful with pinMobile */
  mobileHeight?: string
  /** keep the pin alive on portrait phones (mobile pin tier) */
  pinMobile?: boolean
  children: ReactNode
  className?: string
}

export function Pin({ height, mobileHeight, pinMobile = false, children, className }: PinProps) {
  // The pin room is driven by CSS variables so the mobile collapse needs no
  // client-side window check (no hydration mismatch). By default below md
  // the spacer collapses to auto and the sticky shell becomes a plain flow
  // wrapper: the Mobile Pin Rule (DESIGN.md) says content that cannot fit in
  // 100vh gets an ordinary section, not a pin. Scenes in the mobile pin tier
  // keep a shorter room and the sticky shell on portrait phones AND on short
  // desktop windows (500-699px of height) — the tier scenes fit those shells;
  // the globals.css guard collapses everything below 500px and every
  // non-tier pin under 700px.
  const spacer = pinMobile
    ? 'max-md:[height:var(--pin-height-mobile,auto)] [@media(min-width:768px)_and_(max-height:699.9px)]:[height:var(--pin-height-mobile,auto)] [height:var(--pin-height)]'
    : '[height:var(--pin-height)] max-md:h-auto'
  const shell = pinMobile
    ? 'sticky top-0 h-screen overflow-hidden'
    : 'sticky top-0 h-screen overflow-hidden max-md:static max-md:h-auto max-md:overflow-visible'
  return (
    <div
      className={className}
      data-pin
      data-pin-mobile={pinMobile ? '' : undefined}
      style={
        {
          '--pin-height': height,
          '--pin-height-mobile': mobileHeight ?? 'auto',
        } as React.CSSProperties
      }
    >
      <div className={spacer}>
        <div className={shell}>{children}</div>
      </div>
    </div>
  )
}
