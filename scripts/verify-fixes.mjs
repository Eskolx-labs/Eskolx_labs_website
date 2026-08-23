import { chromium } from 'playwright-core'

const exe = '/usr/bin/chromium'
const base = 'http://localhost:3100'
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
    if (['error', 'warning'].includes(m.type())) consoleMsgs.push(`[${label}] ${m.type()}: ${m.text().slice(0, 160)}`)
  })
  page.on('pageerror', (e) => consoleMsgs.push(`[${label}] pageerror: ${String(e).slice(0, 160)}`))
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)

  const dims = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth,
    overflow: document.documentElement.scrollWidth > innerWidth + 1,
  }))
  const checks = {
    label,
    ...dims,
    tablist: await page.$('div[role="tablist"]') !== null,
    tabpanel: await page.$('#tier-panel') !== null,
    rovingTab: await page.$('#tier-tab-1[tabindex="0"]') !== null,
    ctaStrip: await page.$('text=The season starts at the repo') !== null,
    mobileVine: await page.$('div > svg[viewBox="0 0 160 340"]') !== null,
    backToSoil: await page.$('a[href="#top"]:has-text("Back to the soil")') !== null,
    sealGone: !consoleMsgs.some((m) => m.includes('data-seal')),
    h1: await page.$$eval('h1', (els) => els.length),
  }
  // pull first desktop data-seal reachability through the footer on lg too
  if (label === 'desktop') {
    const sealOk = await page.evaluate(() => {
      const svg = document.querySelector('[data-seal]')
      return svg ? svg.getAttribute('aria-label') : null
    })
    checks.footerSeal = sealOk
  }
  out.push(checks)
  await ctx.close()
}

await verify(1440, 900, 'desktop')
await verify(390, 844, 'mobile')

console.log(JSON.stringify({ checks: out, consoleMessages: consoleMsgs }, null, 1))
await browser.close()
