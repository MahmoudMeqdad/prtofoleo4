import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.SHOT_BASE_URL || "https://iplay-web.vercel.app";
const OUT = path.resolve(process.cwd(), "../../artifacts/day-06");

const shots = [
  {
    file: "en-login-production.png",
    url: `${BASE}/en/login`,
    size: { width: 1440, height: 1000 },
  },
  {
    file: "ar-login-production-mobile.png",
    url: `${BASE}/ar/login`,
    size: { width: 390, height: 844 },
  },
  {
    file: "en-register-customer-production.png",
    url: `${BASE}/en/register`,
    size: { width: 1440, height: 1000 },
  },
  {
    file: "en-register-marketer-production.png",
    url: `${BASE}/en/register`,
    size: { width: 1440, height: 1000 },
    beforeShot: async (page) => {
      const marketer = page.getByRole("radio", { name: /Marketer|مسوّق/i });
      if (await marketer.count()) {
        await marketer.first().check();
        await page.waitForTimeout(300);
      }
    },
  },
];

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  for (const shot of shots) {
    const page = await browser.newPage({ viewport: shot.size });
    const response = await page.goto(shot.url, {
      waitUntil: "networkidle",
      timeout: 90000,
    });
    console.log(`${shot.file}: HTTP ${response?.status() ?? "n/a"}`);
    if (shot.beforeShot) await shot.beforeShot(page);
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(OUT, shot.file),
      fullPage: false,
    });
    await page.close();
    console.log(`Saved ${shot.file}`);
  }

  for (const missing of [
    "account-pending-production.png",
    "account-approved-production.png",
    "admin-pending-accounts-production.png",
    "header-authenticated-production.png",
  ]) {
    console.log(`Skip ${missing} — EXTERNAL BLOCKER: production API not deployed`);
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
