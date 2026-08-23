import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const OUT = '/home/nati/Eskolx-website/.impeccable/review/b-browser.png';
mkdirSync('/home/nati/Eskolx-website/.impeccable/review', { recursive: true });

const results = {
  url: 'http://localhost:3200',
  viewportDesktop: { width: 1440, height: 900 },
  viewportMobile: { width: 390, height: 844 },
  console: [],
  pageErrors: [],
  desktop: null,
  mobile: null,
  failedSteps: [],
};

const collectResults = () => ({
  console: results.console,
  pageErrors: results.pageErrors,
  desktop: results.desktop,
  mobile: results.mobile,
  failedSteps: results.failedSteps,
  screenshot: OUT,
});

const browser = await chromium.launch({
  executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox', '--force-prefers-reduced-motion'],
});

async function desktop() {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  page.on('console', (msg) => {
    const t = msg.type();
    if (t === 'error' || t === 'warning') {
      results.console.push({ type: t, text: msg.text(), location: msg.location() });
    }
  });
  page.on('pageerror', (err) => results.pageErrors.push(String(err)));

  await page.goto('http://localhost:3200', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const data = await page.evaluate(() => {
    const ids = ['top', 'ecosystem', 'tiers', 'roadmap', 'leadership', 'community'];
    const anchors = Array.from(document.querySelectorAll('a[href]'));
    const hashAnchors = anchors
      .map((a) => a.getAttribute('href'))
      .filter((h) => h && h.startsWith('#'));
    const missing = hashAnchors.filter((h) => !document.getElementById(h.slice(1)));

    const focusables = Array.from(
      document.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"]), input, select, textarea')
    ).filter((el) => !el.disabled && el.offsetParent !== null);
    const primaryCta = anchors.find((a) => {
      const t = (a.textContent || '').trim().toLowerCase();
      return t.includes('get started') || t.includes('join') || t.includes('apply') || t.includes('early access') || t.includes('sign up');
    });
    let ctaReachable = null;
    let ctaIndex = null;
    if (primaryCta) {
      ctaIndex = focusables.indexOf(primaryCta);
      let reached = false;
      const focusable = focusables.filter((el) => el !== primaryCta);
      for (let i = 0; i < focusable.length; i++) {
        focusable[i].focus();
      }
      primaryCta.focus();
      reached = document.activeElement === primaryCta;
      ctaReachable = reached;
    }

    return {
      title: document.title,
      h1Count: document.querySelectorAll('h1').length,
      h1Texts: Array.from(document.querySelectorAll('h1')).map((h) => h.textContent.trim()),
      httpLinks: anchors.filter((a) => /^https?:/i.test(a.getAttribute('href') || '')).map((a) => a.getAttribute('href')),
      sections: Object.fromEntries(ids.map((id) => [id, !!document.getElementById(id)])),
      hashAnchors,
      missingHashTargets: missing,
      imgsWithoutAlt: Array.from(document.querySelectorAll('img')).filter((i) => !i.hasAttribute('alt')).length,
      imgCount: document.querySelectorAll('img').length,
      primaryCtaFound: !!primaryCta,
      primaryCtaText: primaryCta ? primaryCta.textContent.trim() : null,
      primaryCtaHref: primaryCta ? primaryCta.getAttribute('href') : null,
      ctaFocusableIndex: ctaIndex,
      ctaReachableByFocus: ctaReachable,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    };
  });

  await page.screenshot({ path: OUT, fullPage: true });
  await context.close();
  return data;
}

async function mobile() {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://localhost:3200', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const data = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
    overflowingSelectors: Array.from(document.querySelectorAll('body *'))
      .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1 || el.getBoundingClientRect().left < -1)
      .slice(0, 25)
      .map((el) => el.tagName + '.' + String(el.className).split(' ').slice(0, 3).join('.'))
      .filter((s, i, a) => a.indexOf(s) === i),
  }));
  await context.close();
  return data;
}

try {
  results.desktop = await desktop();
} catch (e) {
  results.failedSteps.push({ step: 'desktop', reason: String(e) });
}
try {
  results.mobile = await mobile();
} catch (e) {
  results.failedSteps.push({ step: 'mobile', reason: String(e) });
}

console.log(JSON.stringify(collectResults(), null, 2));
await browser.close();
