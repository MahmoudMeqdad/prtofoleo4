/**
 * Capture Day 2 viewport and full-page screenshots.
 * Requires: dev server at http://localhost:3000
 * Run: node scripts/capture-day-02-screenshots.mjs
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "artifacts", "day-02");
const baseUrl = process.env.SCREENSHOT_URL ?? "http://localhost:3000";

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();

const desktop = await browser.newPage();
await desktop.setViewportSize({ width: 1440, height: 1000 });
await desktop.goto(baseUrl, { waitUntil: "networkidle" });
await desktop.waitForTimeout(800);
await desktop.screenshot({
  path: path.join(outDir, "desktop-viewport.png"),
});
await desktop.screenshot({
  path: path.join(outDir, "desktop-full.png"),
  fullPage: true,
});

const mobile = await browser.newPage();
await mobile.setViewportSize({ width: 390, height: 844 });
await mobile.goto(baseUrl, { waitUntil: "networkidle" });
await mobile.waitForTimeout(800);
await mobile.screenshot({
  path: path.join(outDir, "mobile-viewport.png"),
});
await mobile.screenshot({
  path: path.join(outDir, "mobile-full.png"),
  fullPage: true,
});

await browser.close();
console.log(`Screenshots saved to ${outDir}`);
