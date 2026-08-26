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

// The ink snap: the background lerps the whole turn, but text colors hold
// their from-field until the background passes the luminance crossover,
// then re-ink to the to-field in one step. Reason: a lerped ink crosses
// the background's midpoint luminance — dark ink on lightening tan reads
// ~4:1, cream on mid-tan ~2:1, and a gradual ink passes straight through
// the crossover, sitting near-invisible for half of every turn.
// Held-then-snapped keeps both sides of the flip readable; the one-step
// re-ink reads as the spread being re-pressed.
//
// The crossover depends on which way the field turns (measured on this
// palette set: parchment→loam flips at t≈0.54, loam→parchment at t≈0.46 —
// a fixed 0.55 left the dawn direction at 2.86:1, below AA large-text),
// so each pair computes its own flip point once at registration.
function relativeLuminance([r, g, b]: [number, number, number]): number {
  const ch = (v: number) => {
    const x = v / 255
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)
}

function contrast(a: [number, number, number], b: [number, number, number]): number {
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

// smallest t where switching to the to-field ink beats holding the
// from-field ink against the turning background
function crossoverFlip(from: FieldPair, to: FieldPair): number {
  const bgA = rgb(from.bg)
  const bgB = rgb(to.bg)
  const inkFrom = rgb(from.ink)
  const inkTo = rgb(to.ink)
  const mix = (a: [number, number, number], b: [number, number, number], t: number): [number, number, number] => [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ]
  let lo = 0
  let hi = 1
  // g crosses from negative to positive exactly once on these ramps
  if (
    contrast(inkTo, mix(bgA, bgB, 0)) >= contrast(inkFrom, mix(bgA, bgB, 0))
  ) return 0
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2
    const bg = mix(bgA, bgB, mid)
    const gain = contrast(inkTo, bg) - contrast(inkFrom, bg)
    if (gain < 0) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
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
  flip: number
  pinned: boolean
  /** confine the turn to a sub-range of the window (fractions 0-1): the
      field holds one settled spread while the room's content reads, then
      turns across the empty stretch — the seams-only contract */
  turnAt?: [number, number]
  top: number
  height: number
}

const zones = new Map<string, Zone>()
let initialized = false
let reduced = false
let dirty = true
let lastStamp = ''
let lastWrite = 0
let raf = 0

// a write re-styles every element that reads the field vars, so during a
// fast scroll the turn would repaint the document on most frames. The ramp
// is slow by design: ~25 updates a second reads as perfectly continuous
// and roughly halves the work of the heaviest rooms. The trailing write
// still lands — a scheduled paint runs even after scroll stops.
const WRITE_MIN_MS = 38

function rgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function lerpPair(a: FieldPair, b: FieldPair, t: number, flip: number): string[] {
  const inkT = t < flip ? 0 : 1
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
      const raw = Math.min(Math.max((window.scrollY - start) / Math.max(end - start, 1), 0), 1)
      return turnProgress(raw, zone) < 0.5 ? zone.from : zone.to
    })()
    for (const k of KEYS) document.body.style.setProperty(VAR_NAMES[k], pair[k])
    lastStamp = ''
    return
  }

  const [start, end] = turnWindow(zone, vh)
  const raw = Math.min(Math.max((window.scrollY - start) / Math.max(end - start, 1), 0), 1)
  const p = turnProgress(raw, zone)
  // quantize the turn to 1/64 steps before writing: each write dirties the
  // whole document (four custom properties on body), so continuous writes
  // re-styled every element on every scroll frame. Sixty-four steps across
  // a full-screen ramp is under ~4 RGB units per hop — invisible — while
  // write frequency during a slow seam crawl drops by an order of
  // magnitude.
  const pq = Math.round(p * 64) / 64
  const stamp = `${zone.id}:${pq}`
  if (stamp === lastStamp) return
  const now = performance.now()
  if (now - lastWrite < WRITE_MIN_MS) {
    schedule()
    return
  }
  lastWrite = now
  lastStamp = stamp
  const values = lerpPair(zone.from, zone.to, pq, zone.flip)
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
  const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)')
  // track the preference live: a reader toggling it mid-session must not
  // leave the controller on the wrong path until reload
  reducedMq.addEventListener('change', (e) => {
    reduced = e.matches
    dirty = true
    lastStamp = ''
    schedule()
  })
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

export function registerZone(zone: Omit<Zone, 'flip' | 'top' | 'height'>) {
  ensureListeners()
  zones.set(zone.id, {
    ...zone,
    flip: crossoverFlip(zone.from, zone.to),
    top: 0,
    height: 0,
  } as Zone)
  dirty = true
  schedule()
}

// map raw window progress through the zone's turn range; outside the
// range the field sits fully settled on one spread
function turnProgress(p: number, zone: Zone): number {
  const [a, b] = zone.turnAt ?? [0, 1]
  if (b <= a) return p < a ? 0 : 1
  return Math.min(Math.max((p - a) / (b - a), 0), 1)
}

export function removeZone(id: string) {
  zones.delete(id)
  dirty = true
  lastStamp = ''
  schedule()
}
