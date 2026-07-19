import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.SHOT_BASE_URL || "http://localhost:3000";
const OUT = path.resolve(process.cwd(), "../../artifacts/day-06");

const shots = [
  {
    file: "en-login-desktop.png",
    url: `${BASE}/en/login`,
    size: { width: 1440, height: 1000 },
  },
  {
    file: "ar-login-mobile.png",
    url: `${BASE}/ar/login`,
    size: { width: 390, height: 844 },
  },
  {
    file: "en-register-customer.png",
    url: `${BASE}/en/register`,
    size: { width: 1440, height: 1000 },
  },
  {
    file: "en-register-marketer.png",
    url: `${BASE}/en/register`,
    size: { width: 1440, height: 1000 },
    beforeShot: async (page) => {
      await page.getByLabel(/Marketer|مسوّق/i).check();
      await page.waitForTimeout(300);
    },
  },
];

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  for (const shot of shots) {
    const page = await browser.newPage({ viewport: shot.size });
    await page.goto(shot.url, { waitUntil: "networkidle", timeout: 90000 });
    if (shot.beforeShot) await shot.beforeShot(page);
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(OUT, shot.file),
      fullPage: false,
    });
    await page.close();
    console.log(`Saved ${shot.file}`);
  }

  // Placeholder notes for authenticated shots that require a live API.
  for (const missing of [
    "account-pending.png",
    "account-approved.png",
    "admin-pending-accounts.png",
    "header-authenticated.png",
  ]) {
    console.log(
      `Skip ${missing} — requires deployed auth API + QA session (capture after deploy)`,
    );
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
