import { chromium } from 'playwright-core'

const browser = await chromium.launch({
  executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox', '--force-prefers-reduced-motion'],
})
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()
await page.goto('http://localhost:3100', { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
await page.screenshot({
  path: '.impeccable/review/hero-crop.png',
  clip: { x: 700, y: 40, width: 740, height: 820 },
})
console.log('saved hero-crop.png')
await browser.close()
