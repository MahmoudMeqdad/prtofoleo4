import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.SHOT_BASE_URL || "http://localhost:3000";
const OUT = path.resolve(process.cwd(), "../../artifacts/day-03/footer-rebuild");

const shots = [
  {
    file: "footer-en-1920x1080.png",
    url: `${BASE}/en`,
    size: { width: 1920, height: 1080 },
  },
  {
    file: "footer-en-1440x900.png",
    url: `${BASE}/en`,
    size: { width: 1440, height: 900 },
  },
  {
    file: "footer-en-390x844.png",
    url: `${BASE}/en`,
    size: { width: 390, height: 844 },
  },
  {
    file: "footer-ar-1440x900.png",
    url: `${BASE}/ar`,
    size: { width: 1440, height: 900 },
  },
];

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  for (const shot of shots) {
    const page = await browser.newPage({ viewport: shot.size });
    await page.goto(shot.url, { waitUntil: "networkidle", timeout: 90000 });
    await page.waitForSelector(".site-footer", { timeout: 30000 });
    await page.addStyleTag({
      content: `
        header, [data-site-header], .homepage-header, .site-header {
          display: none !important;
        }
      `,
    });
    await page.locator(".site-footer").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.locator(".site-footer").screenshot({
      path: path.join(OUT, shot.file),
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
