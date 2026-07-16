import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "artifacts", "day-02");

const chromePaths = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean);

const executablePath = chromePaths.find((p) => existsSync(p));

if (!executablePath) {
  throw new Error("Chrome executable not found for screenshots");
}

await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const page = await browser.newPage();

async function shot(name, url, width, height, fullPage = false) {
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(() => new Promise((r) => setTimeout(r, 900)));
  const path = join(outDir, name);
  await page.screenshot({ path, fullPage });
  return path;
}

const baseUrl = process.env.SCREENSHOT_BASE_URL ?? "http://localhost:3000";

const files = [
  await shot("desktop-viewport.png", `${baseUrl}/en`, 1440, 1000, false),
  await shot("mobile-viewport.png", `${baseUrl}/en`, 390, 844, false),
  await shot("desktop-full-page.png", `${baseUrl}/en`, 1440, 1000, true),
  await shot("mobile-full-page.png", `${baseUrl}/en`, 390, 844, true),
  await shot("desktop-arabic.png", `${baseUrl}/ar`, 1440, 1000, false),
];

await browser.close();
await writeFile(
  join(outDir, "manifest.txt"),
  files.map((f) => f.replace(/\\/g, "/")).join("\n") + "\n",
);

console.log("Saved:", files.join(", "));
