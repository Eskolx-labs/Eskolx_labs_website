/*
 * The full regression suite. Run `pnpm build` first, then `pnpm test`.
 * Serves out/ on an in-process port, walks the book at five viewports
 * across both motion paths, and fails loudly on any broken promise:
 * pins, scrubs, the ink snap, room openings, touch framing, tap
 * targets, resize reactivity, reduced-motion fallbacks.
 */
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import http from 'http'
import fs from 'fs'
import path from 'path'
const require = createRequire(import.meta.url)
const { chromium } = require('playwright-core')

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'out')
const PORT = 3177
const BASE = `http://127.0.0.1:${PORT}`
const EXE = process.env.CHROME_PATH || '/usr/bin/chromium'

if (!fs.existsSync(path.join(OUT, 'index.html'))) {
  console.error('out/index.html missing — run `pnpm build` first')
  process.exit(1)
}

// ---- tiny static server -------------------------------------------------
const MIME = { html: 'text/html', js: 'text/javascript', css: 'text/css', svg: 'image/svg+xml', woff2: 'font/woff2' }
const server = http.createServer((req, res) => {
  const p = path.join(OUT, req.url === '/' ? 'index.html' : req.url.split('?')[0])
  fs.readFile(p, (err, data) => {
    if (err) { res.statusCode = 404; res.end('no'); return }
    res.setHeader('Content-Type', MIME[p.split('.').pop()] || 'application/octet-stream')
    res.end(data)
  })
})
await new Promise((r) => server.listen(PORT, r))

// ---- harness ------------------------------------------------------------
const results = []
const check = (name, pass, detail = '') => {
  results.push({ name, pass, detail })
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`)
}
const consoleErrors = []
const watch = (page, label) => {
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(`[${label}] ${m.text().slice(0, 100)}`) })
  page.on('pageerror', (e) => consoleErrors.push(`[${label}] ${String(e).slice(0, 100)}`))
}
const browser = await chromium.launch({ executablePath: EXE })
const newPage = async (vp) => {
  const page = await browser.newPage({ viewport: { width: vp[0], height: vp[1] } })
  watch(page, `${vp[0]}x${vp[1]}`)
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1400)
  return page
}
const scrollPin = (page, sel, f) => page.evaluate(({ sel, f }) => {
  const el = document.querySelector(sel)
  const top = el.getBoundingClientRect().top + window.scrollY
  window.__lenis?.scrollTo(top + Math.max(el.offsetHeight - window.innerHeight, 10) * f, { immediate: true })
}, { sel, f })
const scrollToSel = (page, sel) => page.evaluate((s) => {
  const el = document.querySelector(s)
  window.__lenis?.scrollTo(el.getBoundingClientRect().top + window.scrollY, { immediate: true })
}, sel)
const fieldState = (page) => page.evaluate(() => {
  const lum = (s) => {
    const [r, g, b] = s.match(/\d+/g).map(Number).map((v) => {
      const x = v / 255
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }
  const bg = getComputedStyle(document.body).getPropertyValue('--field-bg').trim()
  const ink = getComputedStyle(document.body).getPropertyValue('--field-ink').trim()
  const a = lum(bg); const b = lum(ink)
  return { bg, ink, contrast: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) }
})
// ---- desktop 1440x900 ----------------------------------------------------
{
  const vp = [1440, 900]
  const page = await newPage(vp)
  check('desktop: thesis lines scrub-driven at rest', await page.evaluate(() => getComputedStyle(document.querySelector('[data-mission-line="0"]')).transform !== 'none'))
  check('desktop: night cover at top', (await fieldState(page)).bg.toLowerCase().includes('36, 20, 7'))
  await scrollPin(page, '#tiers [data-pin]', 0.5)
  await page.waitForTimeout(500)
  check('desktop: trellis stack scrubs', await page.evaluate(() => getComputedStyle(document.querySelector('#tiers [data-tier-stack]')).transform !== 'none'))
  await scrollPin(page, '#guide-bar [data-pin]', 0.5)
  await page.waitForTimeout(500)
  check('desktop: bar stack scrubs', await page.evaluate(() => getComputedStyle(document.querySelector('#guide-bar [data-bar-stack]')).transform !== 'none'))

  // plate rooms end their travel inside the room: a pinned stage that
  // freezes for the last third is a room that overpaid for its plate
  check('desktop: tier room ends its travel by 95%', await page.evaluate(() => {
    const stack = document.querySelector('#tiers [data-tier-stack]')
    const pin = document.querySelector('#tiers [data-pin]')
    const travel = stack.scrollHeight - stack.parentElement.clientHeight
    return travel / (pin.offsetHeight - innerHeight) < 0.95
  }))
  check('desktop: bar room ends its travel by 95%', await page.evaluate(() => {
    const stack = document.querySelector('#guide-bar [data-bar-stack]')
    const pin = document.querySelector('#guide-bar [data-pin]')
    const travel = stack.scrollHeight - stack.parentElement.clientHeight
    return travel / (pin.offsetHeight - innerHeight) < 0.95
  }))
  // room openings: first beat on stage at progress 0
  await scrollToSel(page, '#ecosystem')
  await page.waitForTimeout(400)
  check('desktop: identity opens on its heading', await page.evaluate(() => {
    const h = [...document.querySelectorAll('h2')].find((e) => e.textContent.includes('Eshcol Identity'))
    return h && +getComputedStyle(h).opacity === 1
  }))
  await scrollToSel(page, '#roadmap')
  await page.waitForTimeout(400)
  check('desktop: method opens on phase 1', await page.evaluate(() => {
    const t = [...document.querySelectorAll('h3')].find((e) => e.textContent.includes('Basic statistical packages'))
    return t && +getComputedStyle(t.closest('[data-rm-unit], div')).opacity === 1
  }))
  // ink snap: sample the guide-dusk turn, no step below 3.2
  const { top, span } = await page.evaluate(() => {
    const el = document.querySelector('#guide-dusk')
    return { top: el.getBoundingClientRect().top + window.scrollY - window.innerHeight, span: el.offsetHeight + window.innerHeight }
  })
  let minContrast = 99
  for (let i = 0; i <= 10; i++) {
    await page.evaluate(({ top, span, i }) => { window.scrollTo(0, top + span * (i / 10)); window.dispatchEvent(new Event('scroll')) }, { top, span, i })
    await page.waitForTimeout(220)
    minContrast = Math.min(minContrast, (await fieldState(page)).contrast)
  }
  check('desktop: ink snap never below 3.2:1 across the dusk turn', minContrast >= 3.2, `min ${minContrast}:1`)
  // the reverse ramp too: the hero's LOAM->PARCHMENT turn flips at a
  // different crossover than the dusk's, and only walking both proves the
  // per-pair snap holds in both directions
  const heroRoom = await page.evaluate(() => {
    const pin = document.querySelector('#top [data-pin]')
    return { top: pin.getBoundingClientRect().top + window.scrollY, travel: pin.offsetHeight - window.innerHeight }
  })
  let minReverse = 99
  for (let i = 0; i <= 10; i++) {
    await page.evaluate(({ top, travel, i }) => { window.__lenis?.scrollTo(top + travel * (i / 10), { immediate: true }) }, { top: heroRoom.top, travel: heroRoom.travel, i })
    await page.waitForTimeout(220)
    minReverse = Math.min(minReverse, (await fieldState(page)).contrast)
  }
  check('desktop: reverse ramp (cover lift) stays above 3.2:1', minReverse >= 3.2, `min ${minReverse}:1`)
  check('desktop: nav CTA renamed', await page.evaluate(() => document.querySelector('header a.btn-wine')?.textContent.includes('Eskolx on GitHub')))
  check('desktop: thesis CTAs single-line', await page.evaluate(() => {
    const btn = document.querySelector('[data-mission-cta] a')
    return btn && btn.getBoundingClientRect().height < 64
  }))
  // keepers and harvest sit on settled night — never mid-lerp
  for (const [id, name] of [['leadership', 'keepers'], ['community', 'harvest']]) {
    await scrollToSel(page, `#${id}`)
    await page.waitForTimeout(500)
    check(`desktop: ${name} reads on settled loam`, await page.evaluate((id) => {
      const el = document.getElementById(id)
      const r = el.getBoundingClientRect()
      return r.top < innerHeight * 0.5 && r.bottom > innerHeight * 0.5
        ? getComputedStyle(document.body).getPropertyValue('--field-bg').trim().startsWith('rgb(36, 20, 7')
        : false
    }, id))
  }
  // plate windows: a reader stopped mid-room lands on complete plates
  await scrollPin(page, '#guide-bar [data-pin]', 0.52)
  await page.waitForTimeout(500)
  check('desktop: no guillotined heading mid-bar', await page.evaluate(() => {
    const stack = document.querySelector('#guide-bar [data-bar-stack]')
    const frame = stack.parentElement
    const fr = frame.getBoundingClientRect()
    return [...stack.children].every((plate) => {
      const h = plate.querySelector('h3')
      if (!h) return true
      const r = h.getBoundingClientRect()
      return r.bottom < fr.bottom - 8 || r.top > fr.top + 8
    })
  }))
  check('desktop: no horizontal overflow', await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
  await page.close()
}

// ---- phone 390x844 -------------------------------------------------------
{
  const vp = [390, 844]
  const page = await newPage(vp)
  const pinActive = (sel) => page.evaluate((s) => {
    const h = getComputedStyle(document.querySelector(`${s} [data-pin] > div`)).height
    return h.includes('vh') || parseInt(h) > window.innerHeight
  }, sel)
  check('phone: hero pin active', await pinActive('#top'))
  check('phone: cover opens on night', (await fieldState(page)).bg.toLowerCase().includes('36, 20, 7'))
  // the turn must spread across the room: halfway through the hero's
  // travel the field is still visibly mid-night, not the mud-flick the
  // unpinned cover gave (parchment by 170px of scroll)
  await page.evaluate((y) => window.__lenis?.scrollTo(y, { immediate: true }), (await page.evaluate(() => {
    const pin = document.querySelector('#top [data-pin]')
    return (pin.offsetHeight - window.innerHeight) * 0.5
  })))
  await page.waitForTimeout(500)
  check('phone: cover holds night at half room (seams-only)', await page.evaluate(() => {
    const bg = getComputedStyle(document.body).getPropertyValue('--field-bg').trim()
    return bg.startsWith('rgb(36, 20, 7')
  }))
  await page.evaluate((y) => window.__lenis?.scrollTo(y, { immediate: true }), (await page.evaluate(() => {
    const pin = document.querySelector('#top [data-pin]')
    return pin.offsetHeight - window.innerHeight
  })))
  await page.waitForTimeout(500)
  check('phone: cover turns to parchment in the tail', await page.evaluate(() => {
    const bg = getComputedStyle(document.body).getPropertyValue('--field-bg').trim()
    return bg.startsWith('rgb(236, 225, 198')
  }))
  check('phone: headline rises with the scroll', await page.evaluate(() =>
    getComputedStyle(document.querySelector('[data-mission-line="0"]')).transform !== 'none'))
  check('phone: trellis pin active', await pinActive('#tiers'))
  check('phone: bar pin active', await pinActive('#guide-bar'))
  await scrollPin(page, '#tiers [data-pin]', 1)
  await page.waitForTimeout(400)
  check('phone: trellis reaches tier 4', await page.evaluate(() => {
    const stack = document.querySelector('#tiers [data-tier-stack]')
    const frame = stack.parentElement
    const m = new DOMMatrixReadOnly(getComputedStyle(stack).transform === 'none' ? 'matrix(1,0,0,1,0,0)' : getComputedStyle(stack).transform)
    const travel = stack.scrollHeight - frame.clientHeight
    return travel === 0 || -m.f >= travel - 4
  }))
  await scrollPin(page, '#guide-bar [data-pin]', 1)
  await page.waitForTimeout(400)
  // the roadmap and identity chapters are deliberately NOT in the mobile
  // pin tier: their tall plates clip a phone shell, so they flow below md
  check('phone: roadmap and identity flow (no pinned shell)', await page.evaluate(() =>
    getComputedStyle(document.querySelector('#roadmap [data-pin] > div > div')).position === 'static' &&
    getComputedStyle(document.querySelector('#ecosystem [data-pin] > div > div')).position === 'static'))
  // the resting cover carries one quiet action so a non-scroller is never stuck
  check('phone: resting cover CTA present', await page.evaluate(async () => {
    await window.__lenis?.scrollTo(0, { immediate: true })
    await new Promise((r) => setTimeout(r, 200))
    const a = document.querySelector('[data-resting-cta]')
    return a && a.offsetHeight > 30 && +getComputedStyle(a).opacity > 0.9
  }))
  check('phone: bar reaches requirement 4', await page.evaluate(async () => {
    const pin = document.querySelector('#guide-bar [data-pin]')
    await window.__lenis?.scrollTo(pin.getBoundingClientRect().top + scrollY + (pin.offsetHeight - innerHeight), { immediate: true })
    await new Promise((r) => setTimeout(r, 300))
    const stack = document.querySelector('#guide-bar [data-bar-stack]')
    const frame = stack.parentElement
    const m = new DOMMatrixReadOnly(getComputedStyle(stack).transform === 'none' ? 'matrix(1,0,0,1,0,0)' : getComputedStyle(stack).transform)
    const travel = stack.scrollHeight - frame.clientHeight
    return travel === 0 || -m.f >= travel - 4
  }))
  check('phone: stake strips render (4 + 4)', await page.evaluate(() => {
    const bar = document.querySelectorAll('#guide-bar [role=group] button').length
    const tiers = document.querySelectorAll('#tiers [role=group] button').length
    return bar === 4 && tiers >= 4
  }))
  // tap-to-jump on both rooms: the jump lands where the measured fraction
  // says its plate frames
  for (const room of ['guide-bar', 'tiers']) {
    const stackSel = room === 'tiers' ? '[data-tier-stack]' : '[data-bar-stack]'
    await scrollToSel(page, `#${room}`)
    await page.waitForTimeout(400)
    await page.evaluate(({ room }) => [...document.querySelectorAll(`#${room} [role=group] button`)][3].click(), { room })
    await page.waitForTimeout(1800)
    const landed = await page.evaluate(({ room, stackSel }) => {
      const pin = document.querySelector(`#${room} [data-pin]`)
      const top = pin.getBoundingClientRect().top + window.scrollY
      const travel = pin.offsetHeight - window.innerHeight
      const near = Math.abs(window.scrollY - (top + travel))
      const stack = document.querySelector(`#${room} ${stackSel}`)
      const frame = stack.parentElement
      const m = new DOMMatrixReadOnly(getComputedStyle(stack).transform === 'none' ? 'matrix(1,0,0,1,0,0)' : getComputedStyle(stack).transform)
      const maxTravel = stack.scrollHeight - frame.clientHeight
      const frac = Math.min(-m.f / maxTravel, 1)
      const framedLast = frac >= 0.96
      return { nearEnd: near < travel * 0.08, framedLast, frac }
    }, { room, stackSel })
    // both rooms have four plates; tap 04 lands on the last plate
    const expected = 1
    check(`phone: ${room} tap 04 lands on plate 4`, Math.abs(landed.frac - expected) < 0.08)
  }
  await scrollPin(page, '#guide-bar [data-pin]', 0.4)
  await page.waitForTimeout(400)
  check('phone: plate windows use overflow clip', await page.evaluate(() =>
    ['tiers', 'guide-bar'].every((id) => {
      const stack = document.querySelector(`#${id} [data-tier-stack], #${id} [data-bar-stack]`)
      return stack && getComputedStyle(stack.parentElement).overflow === 'clip'
    })))
  check('phone: guide body text 16px', await page.evaluate(() => {
    const dd = document.querySelector('#guide-ledger dd')
    return dd && getComputedStyle(dd).fontSize === '16px'
  }))
  check('phone: vault links present', await page.evaluate(() => document.querySelectorAll('a[href*="Eskolx-Open-Knowledge"]').length >= 2))
  // the strips must READ as lighting on a 44px circle: wine fill, cream
  // numeral — not the desktop rail's subtle border shift
  await scrollPin(page, '#tiers [data-pin]', 0.5)
  await page.waitForTimeout(500)
  check('phone: tier strip lights wine', await page.evaluate(() => {
    const btn = [...document.querySelectorAll('#tiers [role=group] button')].find((b) => b.hasAttribute('data-lit'))
    return btn && getComputedStyle(btn).backgroundColor === 'rgb(124, 44, 84)'
  }))
  check('phone: active stake pops', await page.evaluate(() => {
    const btn = document.querySelector('#tiers [role=group] button[aria-current="true"]')
    return btn && getComputedStyle(btn).transform !== 'none'
  }))
  await scrollPin(page, '#tiers [data-pin]', 0.62)
  await page.waitForTimeout(400)
  check('phone: strip progress rule fills', await page.evaluate(() => {
    const rule = document.querySelector('#tiers [data-strip-progress]')
    const m = new DOMMatrixReadOnly(getComputedStyle(rule).transform)
    return m.a > 0.5
  }))
  check('phone: tier kicker re-inks', await page.evaluate(() => {
    const k = document.querySelector('[data-tier-kicker][data-lit]')
    return k && getComputedStyle(k).color === 'rgb(210, 156, 182)'
  }))
  check('phone: nav carries no backdrop blur', await page.evaluate(() => {
    const nav = document.querySelector('header')
    return getComputedStyle(nav.querySelector('div, nav, section') ?? nav).backdropFilter === 'none'
  }))
  check('phone: marquee scrubs', await page.evaluate(async () => {
    const el = [...document.querySelectorAll('div')].find((d) => d.className.includes && String(d.className).includes('w-max'))
    window.__lenis?.scrollTo(el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.5, { immediate: true })
    await new Promise((r) => setTimeout(r, 600))
    return getComputedStyle(el).transform !== 'none'
  }))
  check('phone: no horizontal overflow', await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
  await page.close()
}

// ---- short desktop 960x540 ----------------------------------------------
{
  const vp = [960, 540]
  const page = await newPage(vp)
  check('short: hero pinned with its phone room', await page.evaluate(() =>
    getComputedStyle(document.querySelector('#top [data-pin] > div > div')).position === 'sticky'))
  check('short: thesis lines masked until scrolled', await page.evaluate(() =>
    getComputedStyle(document.querySelector('[data-mission-line="0"]')).transform !== 'none'))
  check('short: nav logo visible', await page.evaluate(() => {
    const el = document.querySelector('header a[href="#top"]')
    return el && getComputedStyle(el).visibility === 'visible'
  }))
  check('short: tier rooms stay pinned', await page.evaluate(() =>
    ['#tiers', '#guide-bar'].every((id) => getComputedStyle(document.querySelector(`${id} [data-pin] > div > div`)).position === 'sticky')))
  check('short: roadmap phases not superimposed', await page.evaluate(() => {
    const beats = [...document.querySelectorAll('[data-rm-beat]')]
    const tops = beats.map((b) => b.getBoundingClientRect().top + window.scrollY)
    return tops.every((t, i) => i === 0 || t - tops[i - 1] > 50)
  }))
  check('short: no horizontal overflow', await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
  await page.close()
}

// ---- landscape 844x390 ---------------------------------------------------
{
  const vp = [844, 390]
  const page = await newPage(vp)
  check('landscape: every pin collapses', await page.evaluate(() =>
    ['#top', '#tiers', '#guide-bar', '#roadmap'].every((id) => getComputedStyle(document.querySelector(`${id} [data-pin] > div > div`)).position === 'static')))
  check('landscape: no horizontal overflow', await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
  await page.close()
}

// ---- resize reactivity ---------------------------------------------------
{
  const page = await newPage([1440, 900])
  await page.setViewportSize({ width: 960, height: 540 })
  await page.waitForTimeout(1000)
  await page.evaluate("window.__lenis?.scrollTo(0, { immediate: true })")
  await page.waitForTimeout(600)
  check('resize: desktop->short rebuilds (thesis re-pinned, lines masked)', await page.evaluate(() =>
    getComputedStyle(document.querySelector('#top [data-pin] > div > div')).position === 'sticky' &&
    getComputedStyle(document.querySelector('[data-mission-line="0"]')).transform !== 'none'))
  await page.evaluate("(() => { const el = document.querySelector('#tiers [data-pin]'); const top = el.getBoundingClientRect().top + window.scrollY; window.__lenis?.scrollTo(top + 300, { immediate: true }) })()")
  await page.waitForTimeout(600)
  check('resize: short trellis still scrubs', await page.evaluate(() => getComputedStyle(document.querySelector('#tiers [data-tier-stack]')).transform !== 'none'))
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.waitForTimeout(1000)
  await page.evaluate("window.__lenis?.scrollTo(0, { immediate: true })")
  await page.waitForTimeout(600)
  check('resize: back to desktop restores the masked rise', await page.evaluate(() => getComputedStyle(document.querySelector('[data-mission-line="0"]')).transform !== 'none'))
  await page.close()
}

// ---- reduced motion ------------------------------------------------------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  watch(page, 'reduced')
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  check('reduced: hero headline static visible', await page.evaluate(() => getComputedStyle(document.querySelector('[data-mission-line="0"]')).transform === 'none' && +getComputedStyle(document.querySelector('[data-mission-line="0"]')).opacity === 1))
  check('reduced: wordmark clears the nav', await page.evaluate(() => {
    const mark = document.querySelector('[data-hero-mark]').getBoundingClientRect()
    const nav = document.querySelector('header a[href="#top"]').getBoundingClientRect()
    return mark.top >= nav.bottom - 2
  }))
  check('reduced: pins collapsed', await page.evaluate(() => getComputedStyle(document.querySelector('#top [data-pin] > div > div')).position === 'static'))
  check('reduced: origin plate visible', await page.evaluate(() => {
    const p = document.querySelector('[data-id-plate="0"]')
    return p && +getComputedStyle(p).opacity === 1
  }))
  await page.evaluate("(() => { const el = document.querySelector('#guide-dusk'); window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + el.offsetHeight) })()")
  await page.waitForTimeout(600)
  const night = await page.evaluate(() => {
    const raw = getComputedStyle(document.body).getPropertyValue('--field-bg').trim()
    const nums = raw.startsWith('#')
      ? [1, 3, 5].map((i) => parseInt(raw.slice(i, i + 2), 16)).join(', ')
      : raw.match(/\d+/g).join(', ')
    return `rgb(${nums})`
  })
  check('reduced: night chapters read loam', night === 'rgb(36, 20, 7)', night)
  await ctx.close()
}

// ---- content --------------------------------------------------------------
{
  const page = await newPage([1440, 900])
  check('content: vault linked twice', await page.evaluate(() => document.querySelectorAll('a[href*="Eskolx-Open-Knowledge"]').length >= 2))
  check('content: 404 page exists in build', fs.existsSync(path.join(OUT, '404.html')))
  // FAQ rows unfold on a grid-rows transition (button + aria-expanded)
  check('content: FAQ answer unfolds on click', await page.evaluate(async () => {
    const row = document.querySelector('#guide-ledger [data-reveal-item]:has(button[aria-controls^="faq-answer"])')
    const btn = row.querySelector('button')
    const panel = document.getElementById(btn.getAttribute('aria-controls'))
    const closedH = panel.getBoundingClientRect().height
    btn.click()
    await new Promise((r) => setTimeout(r, 450))
    return btn.getAttribute('aria-expanded') === 'true' && closedH < 2 && panel.getBoundingClientRect().height > 20
  }))
  // the book-close rule draws at the very end
  await page.evaluate(() => window.__lenis?.scrollTo(document.documentElement.scrollHeight, { immediate: true }))
  await page.waitForTimeout(900)
  // the roadmap exit was invisible for its whole life: a shorter-than-
  // viewport zone with pinned-style strings computed a zero-length trigger
  await page.evaluate(() => {
    const zone = document.querySelector('[data-exit-inner]').parentElement
    window.__lenis?.scrollTo(zone.getBoundingClientRect().top + scrollY + zone.offsetHeight / 2 - innerHeight / 2, { immediate: true })
  })
  await page.waitForTimeout(700)
  check('desktop: roadmap exit reveals', await page.evaluate(() =>
    +getComputedStyle(document.querySelector('[data-exit-inner]')).opacity > 0.5))
  await page.waitForTimeout(600)
  await page.evaluate(() => window.__lenis?.scrollTo(document.documentElement.scrollHeight, { immediate: true }))
  await page.waitForTimeout(1400)
  check('desktop: close-rule drawn at book end', await page.evaluate(() => {
    const el = document.querySelector('[data-close-rule]')
    if (!el) return false
    const m = new DOMMatrixReadOnly(getComputedStyle(el).transform === 'none' ? 'matrix(1,0,0,1,0,0)' : getComputedStyle(el).transform)
    return m.a > 0.9
  }))
  // turning-chapter headings ride the field ink: visible at their entry
  await page.evaluate(() => {
    const el = document.getElementById('community')
    window.__lenis?.scrollTo(el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.5, { immediate: true })
  })
  await page.waitForTimeout(700)
  check('content: harvest heading rides field ink', await page.evaluate(() => {
    const h = [...document.querySelectorAll('h2')].find((e) => e.textContent.includes('harvest table'))
    const fieldInk = getComputedStyle(document.body).getPropertyValue('--field-ink').trim()
    return getComputedStyle(h).color === fieldInk
  }))
  await page.close()
}

// ---- band boundaries ------------------------------------------------------
{
  // The JS bands and CSS guards pair fractionally (700/699.99, 500/499.99)
  // so zoomed or display-scaled viewports always land in one band. These
  // boundary heights are where a mismatch would strand a reader between
  // bands with frozen pins and no timelines.
  const page = await newPage([1440, 699])
  check('band 699h: tier rooms pinned', await page.evaluate(() =>
    ['#top', '#tiers', '#guide-bar'].every((id) => getComputedStyle(document.querySelector(`${id} [data-pin] > div > div`)).position === 'sticky')))
  await page.setViewportSize({ width: 1440, height: 700 })
  await page.waitForTimeout(1000)
  check('band 700h: hero pinned again', await page.evaluate(() =>
    getComputedStyle(document.querySelector('#top [data-pin] > div > div')).position === 'sticky'))
  await page.evaluate(() => {
    const el = document.getElementById('tiers')
    window.__lenis?.scrollTo(el.getBoundingClientRect().top + window.scrollY + 300, { immediate: true })
  })
  await page.waitForTimeout(600)
  check('band 700h: trellis scrubs after crossing up', await page.evaluate(() =>
    getComputedStyle(document.querySelector('#tiers [data-tier-stack]')).transform !== 'none'))
  await page.close()
}

await browser.close()
server.close()

const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
if (consoleErrors.length) {
  console.log(`console errors: ${consoleErrors.length}`)
  for (const e of consoleErrors.slice(0, 5)) console.log('  ', e)
}
if (failed.length) {
  console.log('FAILURES:')
  for (const f of failed) console.log('  -', f.name, f.detail)
  process.exit(1)
}
