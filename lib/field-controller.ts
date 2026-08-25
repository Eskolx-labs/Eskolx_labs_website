'use client'

/*
 * The page's two almanac fields, owned by exactly one writer.
 *
 * Minimal-goods pattern: the field colors are not flipped at boundaries —
 * they are scrubbed continuously against the scroll, so the page is always
 * mid-transition while a chapter turns and always settled between chapters.
 * Each section Root registers an element-anchored zone with a from/to pair;
 * every frame the controller interpolates the active zone's pair by scroll
 * progress and writes four CSS variables straight to body. No tweens: the
 * color is a pure function of scrollY, identical in both directions.
 */

export type FieldPair = { bg: string; ink: string; soft: string; line: string }

export const PARCHMENT: FieldPair = {
  bg: '#ece1c6',
  ink: '#29190c',
  soft: '#5c4a33',
  line: '#b9a67f',
}

export const LOAM: FieldPair = {
  bg: '#241407',
  ink: '#f0e4c8',
  soft: '#b8a284',
  line: '#5a4227',
}

const KEYS = ['bg', 'ink', 'soft', 'line'] as const

// the ink snap: the background lerps the whole turn, but text colors hold
// their from-field until the background passes the luminance crossover
// (~55% of the turn), then re-ink to the to-field in one step. Reason: a
// lerped ink crosses the background's midpoint luminance — dark ink on
// lightening tan reads ~4:1, cream on mid-tan ~2:1, and a gradual ink
// passes straight through the crossover, sitting near-invisible for half
// of every turn. Held-then-snapped keeps both sides of the flip at 3.3:1
// or better; the one-step re-ink reads as the spread being re-pressed.
const INK_FLIP_AT = 0.55

function inkProgress(t: number): number {
  return t < INK_FLIP_AT ? 0 : 1
}
const VAR_NAMES: Record<(typeof KEYS)[number], string> = {
  bg: '--field-bg',
  ink: '--field-ink',
  soft: '--field-ink-soft',
  line: '--field-line',
}

type Zone = {
  id: string
  el: HTMLElement
  from: FieldPair
  to: FieldPair
  pinned: boolean
  top: number
  height: number
}

const zones = new Map<string, Zone>()
let initialized = false
let reduced = false
let dirty = true
let lastStamp = ''
let raf = 0

function rgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function lerpPair(a: FieldPair, b: FieldPair, t: number): string[] {
  const inkT = inkProgress(t)
  const out: string[] = []
  for (const k of KEYS) {
    const p = k === 'bg' ? t : inkT
    const ca = rgb(a[k])
    const cb = rgb(b[k])
    const c = ca.map((v, i) => Math.round(v + (cb[i] - v) * p))
    out.push(`rgb(${c[0]}, ${c[1]}, ${c[2]})`)
  }
  return out
}

function measure() {
  for (const z of zones.values()) {
    const rect = z.el.getBoundingClientRect()
    z.top = rect.top + window.scrollY
    z.height = z.el.offsetHeight || window.innerHeight
  }
  dirty = false
}

// pinned rooms turn across their exact pin duration; ordinary sections turn
// across their passage into the viewport, which keeps short chapters from
// snapping while still reading as a continuous turn. The start clamps at the
// page top so the first section opens settled, never half-turned.
function turnWindow(z: Zone, vh: number): [number, number] {
  if (z.pinned && z.height > vh) return [Math.max(z.top, 0), z.top + z.height - vh]
  return [Math.max(z.top - vh * 0.72, 0), z.top + z.height - vh * 0.3]
}

function activeZone(sorted: Zone[], center: number): Zone {
  let zone = sorted[0]
  for (const z of sorted) {
    if (center >= z.top && center < z.top + z.height) {
      zone = z
      break
    }
  }
  return zone
}

function paint() {
  raf = 0
  if (!zones.size) return
  const vh = window.innerHeight
  if (dirty) measure()
  // the book-closing rule: the last painted pixel of the document belongs
  // to parchment — the almanac always ends settled on the day field, even
  // when the final section is too short for the reader's midpoint to
  // formally pass into the footer's zone.
  const docH = document.documentElement.scrollHeight
  const closed = window.scrollY + vh >= docH - 2
  const sorted = Array.from(zones.values()).sort(
    (a, b) => a.top - b.top || b.height - a.height,
  )
  const zone = activeZone(sorted, window.scrollY + vh * 0.5)

  if (reduced || closed) {
    // static contract: each chapter sits at the field its first half opens
    // on — so the hero cover reads parchment and the night chapters read
    // loam, snapping only at each chapter's midpoint. At the very end of
    // the document the book closes onto night: the almanac ends where it
    // began, the lab still working by lamplight.
    const pair = closed ? LOAM : (() => {
      const [start, end] = turnWindow(zone, vh)
      const p = Math.min(Math.max((window.scrollY - start) / Math.max(end - start, 1), 0), 1)
      return p < 0.5 ? zone.from : zone.to
    })()
    for (const k of KEYS) document.body.style.setProperty(VAR_NAMES[k], pair[k])
    lastStamp = ''
    return
  }

  const [start, end] = turnWindow(zone, vh)
  const p = Math.min(Math.max((window.scrollY - start) / Math.max(end - start, 1), 0), 1)
  const stamp = `${zone.id}:${p.toFixed(4)}`
  if (stamp === lastStamp) return
  lastStamp = stamp
  const values = lerpPair(zone.from, zone.to, p)
  for (let i = 0; i < KEYS.length; i++) {
    document.body.style.setProperty(VAR_NAMES[KEYS[i]], values[i])
  }
}

function schedule() {
  if (!raf) raf = requestAnimationFrame(paint)
}

function ensureListeners() {
  if (initialized) return
  initialized = true
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', () => {
    dirty = true
    schedule()
  })
  // zone geometry is measured once, so late shifts must invalidate it: web
  // fonts swap in and resize every text block, and the load event settles
  // pin spacers and images. Without this the turns run on stale positions.
  window.addEventListener('load', () => {
    dirty = true
    schedule()
  })
  document.fonts?.ready.then(() => {
    dirty = true
    schedule()
  })
  schedule()
}

export function registerZone(zone: Omit<Zone, 'top' | 'height'>) {
  ensureListeners()
  zones.set(zone.id, { ...zone, top: 0, height: 0 } as Zone)
  dirty = true
  schedule()
}

export function removeZone(id: string) {
  zones.delete(id)
  dirty = true
  lastStamp = ''
  schedule()
}
