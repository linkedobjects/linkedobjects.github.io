// Renders tools/og.html to og.png (1200 × 630), the picture shown when a link to the site is shared.
//   node tools/og.mjs [path to playwright's index.mjs]   (default: the playwright package)
import { fileURLToPath } from 'node:url'
const { chromium } = await import(process.argv[2] || 'playwright')
const here = (p) => fileURLToPath(new URL(p, import.meta.url))
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.goto('file://' + here('./og.html'))
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: here('../og.png') })
await browser.close()
