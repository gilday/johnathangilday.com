/**
 * Developer screenshot script.
 *
 * Takes a defined set of screenshots across all pages and viewports,
 * writing them to screenshots/ (gitignored). Cleans the output directory
 * before each run so stale files never accumulate.
 *
 * Usage:
 *   node scripts/screenshot.mjs               # targets http://localhost:4321
 *   node scripts/screenshot.mjs --url https://johnathangilday.com
 */

import { chromium } from "playwright"
import { rmSync, mkdirSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(__dirname, "../screenshots")

const args = process.argv.slice(2)
const urlFlag = args.indexOf("--url")
const baseUrl =
  urlFlag !== -1 ? args[urlFlag + 1] : "http://localhost:4321"

const VIEWPORTS = {
  desktop: { width: 1280, height: 800 },
  mobile: { width: 390, height: 844 },
}

const PAGES = [
  { name: "landing", path: "/", viewports: ["desktop", "mobile"] },
  { name: "blog", path: "/blog/", viewports: ["desktop"] },
  {
    name: "blog-post",
    path: "/blog/claude-code-seed-stage-startup/",
    viewports: ["desktop"],
  },
  { name: "resume", path: "/resume/", viewports: ["desktop"] },
]

// Clean output directory before each run
rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

console.log(`Taking screenshots against ${baseUrl}`)
console.log(`Output: ${outDir}\n`)

const browser = await chromium.launch()

for (const { name, path, viewports } of PAGES) {
  for (const vpName of viewports) {
    const { width, height } = VIEWPORTS[vpName]
    const context = await browser.newContext({ viewport: { width, height } })
    const page = await context.newPage()

    const url = `${baseUrl}${path}`
    await page.goto(url, { waitUntil: "load", timeout: 15000 })

    const filename = `${name}-${vpName}.png`
    await page.screenshot({ path: `${outDir}/${filename}`, fullPage: true })
    console.log(`  ✓ ${filename}`)

    await context.close()
  }
}

await browser.close()
console.log("\nDone.")
