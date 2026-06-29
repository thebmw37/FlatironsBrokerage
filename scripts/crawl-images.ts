/// <reference lib="dom" />
/**
 * Crawls https://www.flatironsbrokerage.com (the client's existing Squarespace site)
 * and downloads referenced images into public/images so the new site can reuse them.
 *
 * Usage: npm run crawl-images
 */

import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join, extname } from 'node:path'
import { URL } from 'node:url'

const ORIGIN = 'https://www.flatironsbrokerage.com'
const PATHS = ['/', '/contact', '/properties']
const OUT_DIR = 'public/images/source'
const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'

async function ensureDir(p: string) {
  if (!existsSync(p)) await mkdir(p, { recursive: true })
}

function safeName(urlStr: string): string {
  try {
    const u = new URL(urlStr)
    const last = u.pathname.split('/').pop() || 'image'
    const cleaned = last.replace(/[^a-z0-9._-]/gi, '_').slice(0, 100)
    if (!extname(cleaned)) return cleaned + '.jpg'
    return cleaned
  } catch {
    return 'image.jpg'
  }
}

async function downloadImage(urlStr: string, dir: string) {
  try {
    const res = await fetch(urlStr, { headers: { 'user-agent': USER_AGENT } })
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    const name = safeName(urlStr)
    const local = join(dir, name)
    await ensureDir(dirname(local))
    await writeFile(local, buf)
    return local
  } catch (e) {
    console.warn('  download failed:', urlStr, (e as Error).message)
    return null
  }
}

async function main() {
  await ensureDir(OUT_DIR)
  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: USER_AGENT,
  })

  const allImages = new Set<string>()
  for (const path of PATHS) {
    const url = ORIGIN + path
    console.log('▸ visiting', url)
    const page = await ctx.newPage()
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 })
      await page.waitForTimeout(1500)
      await page.evaluate(() =>
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' as ScrollBehavior }),
      )
      await page.waitForTimeout(1500)
      const imgs = await page.$$eval('img', (els) =>
        els
          .map((i) => (i as HTMLImageElement).currentSrc || (i as HTMLImageElement).src)
          .filter(Boolean),
      )
      const bgs = await page.$$eval('[style*="background"]', (els) =>
        els
          .map((e) => {
            const s = (e as HTMLElement).style.backgroundImage
            const m = s?.match(/url\(["']?([^"')]+)["']?\)/)
            return m?.[1] || ''
          })
          .filter(Boolean),
      )
      for (const i of imgs) allImages.add(i)
      for (const b of bgs) allImages.add(b)
      console.log(`  found ${imgs.length} img tags, ${bgs.length} bg images`)
    } catch (e) {
      console.warn('  visit failed:', (e as Error).message)
    }
    await page.close()
  }
  await browser.close()

  const items = [...allImages].filter((u) => u.startsWith('http'))
  console.log(`\n▸ downloading ${items.length} unique images…`)
  let ok = 0
  for (const url of items) {
    const local = await downloadImage(url, OUT_DIR)
    if (local) ok++
  }
  console.log(`✓ downloaded ${ok}/${items.length} into ${OUT_DIR}/`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
