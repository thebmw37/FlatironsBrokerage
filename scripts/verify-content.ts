/**
 * Smoke test: load each page in the running dev server and assert that text
 * sourced from the .txt content files actually shows up in the DOM.
 *
 * Usage:  BASE_URL=http://localhost:5174 tsx scripts/verify-content.ts
 */

import { chromium } from 'playwright'

const BASE = process.env.BASE_URL ?? 'http://localhost:5173'

const CHECKS = [
  // [path, substring expected to appear in the rendered page]
  ['/', '4725 Mesa Ridge Lane'], // featured property address
  ['/', 'Joni Renee Zalk'], // broker name in About section
  ['/', 'Stephanie Sexton'], // testimonial author
  ['/about', 'matchmaking'], // broker bio
  ['/blog', 'Boulder Market Outlook'], // blog post title
  ['/properties', '4 properties'], // category count (Active has 4)
  ['/properties/active', 'Mesa Ridge Lane'],
  ['/properties/under-contract', 'Canopy Retreat'],
  ['/properties/sold', 'Pearl Park Suite'],
  ['/contact', 'joni@flatironsbrokerage.com'],
] as const

async function main() {
  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  let failures = 0

  for (const [path, needle] of CHECKS) {
    const url = BASE + path
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 })
    // Give the github fetch a moment to resolve (or fail to bundled).
    await page.waitForTimeout(800)
    const body = (await page.locator('body').innerText()).toLowerCase()
    const found = body.includes(needle.toLowerCase())
    console.log(`${found ? '✓' : '✗'}  ${path}  →  "${needle}"`)
    if (!found) failures++
  }

  await browser.close()
  if (failures > 0) {
    console.error(`\n${failures} check(s) failed.`)
    process.exit(1)
  }
  console.log('\nAll checks passed.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
