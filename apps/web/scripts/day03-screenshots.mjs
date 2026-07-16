import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.SHOT_BASE_URL || "http://localhost:3000";
const OUT = path.resolve(process.cwd(), "../../artifacts/day-03");

const shots = [
  {
    file: "en-collections-desktop.png",
    url: `${BASE}/en/collections`,
    size: { width: 1440, height: 1000 },
  },
  {
    file: "en-collection-detail-desktop.png",
    url: `${BASE}/en/collections/tiny-worlds`,
    size: { width: 1440, height: 1000 },
  },
  {
    file: "ar-collection-detail-desktop.png",
    url: `${BASE}/ar/collections/tiny-worlds`,
    size: { width: 1440, height: 1000 },
  },
  {
    file: "en-about-mobile.png",
    url: `${BASE}/en/about`,
    size: { width: 390, height: 844 },
  },
  {
    file: "en-dropshipping-desktop.png",
    url: `${BASE}/en/dropshipping`,
    size: { width: 1440, height: 1000 },
  },
  {
    file: "en-wholesale-desktop.png",
    url: `${BASE}/en/wholesale`,
    size: { width: 1440, height: 1000 },
  },
  {
    file: "en-contact-mobile.png",
    url: `${BASE}/en/contact`,
    size: { width: 390, height: 844 },
  },
];

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  for (const shot of shots) {
    const page = await browser.newPage({ viewport: shot.size });
    await page.goto(shot.url, { waitUntil: "networkidle", timeout: 90000 });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(OUT, shot.file),
      fullPage: false,
    });
    await page.close();
    console.log(`Saved ${shot.file}`);
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
