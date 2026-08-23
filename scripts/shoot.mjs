import { chromium } from 'playwright-core'

const BASE = process.env.BASE_URL ?? 'http://localhost:3100'
const exe = '/usr/bin/chromium'

const browser = await chromium.launch({
  executablePath: exe,
  args: ['--no-sandbox', '--force-prefers-reduced-motion'],
})

async function capture(name, { width, height, dsf = 1 }) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: dsf,
    reducedMotion: 'reduce',
  })
  const page = await ctx.newPage()
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `.impeccable/review/${name}`, fullPage: true })
  console.log('saved', name)
  await ctx.close()
}

await capture('desktop.png', { width: 1440, height: 900 })
await capture('mobile.png', { width: 390, height: 844, dsf: 2 })

// live-motion evidence: normal motion, mid-scroll at the roadmap vine
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
  await page.evaluate(() => {
    document.querySelector('#roadmap')?.scrollIntoView({ behavior: 'instant', block: 'start' })
    window.scrollBy(0, -80)
  })
  await page.waitForTimeout(1400)
  await page.screenshot({ path: '.impeccable/review/desktop-midscroll.png' })
  console.log('saved desktop-midscroll.png')
  await ctx.close()
}

await browser.close()
