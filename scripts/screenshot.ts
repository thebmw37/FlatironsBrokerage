/**
 * Captures full-page desktop + mobile screenshots of every route in the
 * local dev server, for visual review.
 *
 * Usage:  tsx scripts/screenshot.ts
 */

import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

const BASE = process.env.BASE_URL ?? 'http://localhost:5173'
const OUT = 'screenshots'
const ROUTES = [
  ['home', '/'],
  ['blog', '/blog'],
  ['about', '/about'],
  ['properties', '/properties'],
  ['active', '/properties/active'],
  ['under-contract', '/properties/under-contract'],
  ['sold', '/properties/sold'],
  ['contact', '/contact'],
] as const

async function main() {
  if (!existsSync(OUT)) await mkdir(OUT, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  })

  for (const [name, path] of ROUTES) {
    const url = BASE + path
    console.log('▸', url)

    for (const [label, ctx] of [
      ['desktop', desktop],
      ['mobile', mobile],
    ] as const) {
      const page = await ctx.newPage()
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 })
      await page.waitForTimeout(800)
      const file = join(OUT, `${name}-${label}.png`)
      await page.screenshot({ path: file, fullPage: true })
      console.log('  ✓', file)
      await page.close()
    }
  }

  await browser.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
