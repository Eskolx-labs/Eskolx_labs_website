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
}

export function Root({
  children,
  start = 'top top',
  end = 'bottom bottom',
  scrub = true,
  field,
  className,
  id,
}: RootProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: reduce)', () => {
      setReduced(true)
      return () => setReduced(false)
    })
    return () => mm.revert()
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // reduced-motion and mobile are read synchronously so a from-state never
    // renders before the async matchMedia flip lands.
    const reducedNow = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobileNow = window.matchMedia('(max-width: 767px)').matches

    // the field is owned by the field controller: this section's zone scrubs
    // the page colors continuously across the section's travel. It registers
    // on every path (reduced motion and mobile included) so the nav tints
    // with the chapter everywhere.
    let zoneId: string | null = null
    if (field) {
      zoneId = `zone-${id ?? Math.random().toString(36).slice(2, 8)}`
      registerZone({
        id: zoneId,
        el,
        from: field.from,
        to: field.to,
        pinned: !!el.querySelector('[data-pin]'),
      })
    }

    // below lg the pins are ordinary stacked sections: no scrubbed timeline,
    // so nothing moves against the scroll and no scroll tax applies.
    if (reducedNow || reduced || mobileNow) {
      return () => {
        if (zoneId) removeZone(zoneId)
      }
    }

    gsap.registerPlugin(ScrollTrigger)
    const pinned = !!el.querySelector('[data-pin]')
    // Flow chapters configured as "top bottom"/"bottom top" own their whole
    // viewport crossing: the natural string-form span is element height +
    // viewport, which is what makes bands like the seed-catalog marquee read
    // letter by letter. But a chapter that sits last before a short footer can
    // never scroll its bottom to the viewport top, so we clamp the span to the
    // document's last scroll position — mid-page chapters keep the full
    // crossing, the final one simply completes at book close.
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
                // natural crossing span; never past the document's last
                // scroll position so final chapters complete at book close
                const natural = el.offsetHeight + window.innerHeight
                const reachable =
                  document.documentElement.scrollHeight -
                  window.innerHeight -
                  startPx
                return `+=${Math.max(Math.min(natural, reachable), 1)}`
              }
            : end,
        scrub,
      },
    })
    // the beat contract is a 0-100 band: pin the timeline's duration there
    // even when children end early, or a section whose last tween stops at
    // 20 compresses every window fivefold (keepers arrived half-faded)
    tl.set({}, {}, 100)
    setTimeline(tl)
    return () => {
      tl.revert()
      if (zoneId) removeZone(zoneId)
      setTimeline(null)
    }
  }, [reduced, start, end, scrub, field, id])

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
  }, [timeline, start, end, to, fromTo, target, getSpace])

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
  children: ReactNode
  className?: string
}

export function Pin({ height, children, className }: PinProps) {
  // The pin room is driven by a CSS variable so the mobile collapse needs no
  // client-side window check (no hydration mismatch). Below lg the spacer
  // height collapses to auto and the sticky shell becomes a plain flow
  // wrapper: the Mobile Pin Rule (DESIGN.md) says content that cannot fit in
  // 100vh gets an ordinary section, not a pin.
  return (
    <div
      className={className}
      data-pin
      style={{ '--pin-height': height } as React.CSSProperties}
    >
      <div className="[height:var(--pin-height)] max-md:h-auto">
        <div className="sticky top-0 h-screen overflow-hidden max-md:static max-md:h-auto max-md:overflow-visible">
          {children}
        </div>
      </div>
    </div>
  )
}
