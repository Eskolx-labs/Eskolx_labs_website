import { chromium } from 'playwright-core'

const exe = '/usr/bin/chromium'
const base = 'http://127.0.0.1:3100'
const out = []
const consoleMsgs = []

const browser = await chromium.launch({
  executablePath: exe,
  args: ['--no-sandbox', '--force-prefers-reduced-motion'],
})

async function verify(width, height, label) {
  const ctx = await browser.newContext({ viewport: { width, height } })
  const page = await ctx.newPage()
  page.on('console', (m) => {
    if (['error', 'warning'].includes(m.type())) consoleMsgs.push(`[${label}] ${m.type()}: ${m.text().slice(0, 200)}`)
  })
  page.on('pageerror', (e) => consoleMsgs.push(`[${label}] pageerror: ${String(e).slice(0, 200)}`))
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)

  const dims = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth,
    overflow: document.documentElement.scrollWidth > innerWidth + 1,
    scrollHeight: document.documentElement.scrollHeight,
  }))

  const field = await page.evaluate(() => ({
    bg: getComputedStyle(document.body).getPropertyValue('--field-bg').trim(),
    ink: getComputedStyle(document.body).getPropertyValue('--field-ink').trim(),
  }))

  const checks = {
    label,
    ...dims,
    field,
    heroPin: await page.$('#top [style*="height: 300vh"]') !== null,
    tierPin: await page.$('#tiers [style*="height: 420vh"]') !== null,
    roadmapPin: await page.$('#roadmap [style*="height: 360vh"]') !== null,
    vinePlate: await page.$('.hero-vine') !== null,
    tierStack: await page.$('[data-tier-stack]') !== null,
    phaseStack: await page.$('[data-phase-stack]') !== null,
    h1: await page.$$eval('h1', (els) => els.length),
    h1Text: await page.$eval('h1', (el) => el.textContent.replace(/\s+/g, ' ').trim()),
  }
  out.push(checks)
  await ctx.close()
}

await verify(1440, 900, 'desktop')
await verify(390, 844, 'mobile')

console.log(JSON.stringify({ checks: out, consoleMessages: consoleMsgs }, null, 1))
await browser.close()
