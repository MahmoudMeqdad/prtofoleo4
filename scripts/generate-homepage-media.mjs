/**
 * Generates temporary IPLAY homepage placeholder media (SVG + optional hero MP4).
 * Run: node scripts/generate-homepage-media.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const mediaRoot = join(root, "apps/web/public/media/home");
const collectionsDir = join(mediaRoot, "collections");

function svgPanel({
  width,
  height,
  from,
  to,
  accent,
  label,
  shapes = "",
}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  ${shapes}
  <text x="48" y="${height - 48}" fill="${accent}" font-family="system-ui,sans-serif" font-size="28" opacity="0.35">IPLAY TEMP</text>
  <text x="48" y="72" fill="${accent}" font-family="system-ui,sans-serif" font-size="20" opacity="0.5">${label}</text>
</svg>`;
}

const panels = [
  {
    file: "hero-poster.svg",
    dir: mediaRoot,
    svg: svgPanel({
      width: 1920,
      height: 1080,
      from: "#1a1040",
      to: "#6c4cff",
      accent: "#ffffff",
      label: "Hero Poster",
      shapes: `<circle cx="960" cy="520" r="180" fill="#ff5e8a" opacity="0.35"/><circle cx="720" cy="380" r="90" fill="#ffcc33" opacity="0.45"/><rect x="1180" y="360" width="220" height="220" rx="40" fill="#ffffff" opacity="0.12"/>`,
    }),
  },
  {
    file: "tiny-worlds-desktop.svg",
    dir: collectionsDir,
    svg: svgPanel({
      width: 1920,
      height: 1200,
      from: "#14204a",
      to: "#3b2f8f",
      accent: "#ffffff",
      label: "Tiny Worlds",
      shapes: `<circle cx="520" cy="620" r="140" fill="#7ad7ff" opacity="0.5"/><rect x="980" y="420" width="280" height="280" rx="24" fill="#ffd166" opacity="0.35"/>`,
    }),
  },
  {
    file: "tiny-worlds-mobile.svg",
    dir: collectionsDir,
    svg: svgPanel({
      width: 780,
      height: 1200,
      from: "#14204a",
      to: "#3b2f8f",
      accent: "#ffffff",
      label: "Tiny Worlds Mobile",
      shapes: `<circle cx="390" cy="680" r="120" fill="#7ad7ff" opacity="0.5"/>`,
    }),
  },
  {
    file: "creative-studio-desktop.svg",
    dir: collectionsDir,
    svg: svgPanel({
      width: 1920,
      height: 1200,
      from: "#fff6e8",
      to: "#ffd9b8",
      accent: "#2b2b2b",
      label: "Creative Studio",
      shapes: `<rect x="220" y="320" width="180" height="180" rx="16" fill="#ff8fab" opacity="0.55"/><circle cx="1320" cy="560" r="160" fill="#6c4cff" opacity="0.18"/>`,
    }),
  },
  {
    file: "creative-studio-mobile.svg",
    dir: collectionsDir,
    svg: svgPanel({
      width: 780,
      height: 1200,
      from: "#fff6e8",
      to: "#ffd9b8",
      accent: "#2b2b2b",
      label: "Creative Studio Mobile",
    }),
  },
  {
    file: "outdoor-fun-desktop.svg",
    dir: collectionsDir,
    svg: svgPanel({
      width: 1920,
      height: 1200,
      from: "#0f5132",
      to: "#52b788",
      accent: "#ffffff",
      label: "Outdoor Fun",
      shapes: `<ellipse cx="960" cy="760" rx="420" ry="120" fill="#ffffff" opacity="0.12"/>`,
    }),
  },
  {
    file: "outdoor-fun-poster.svg",
    dir: collectionsDir,
    svg: svgPanel({
      width: 1920,
      height: 1200,
      from: "#0f5132",
      to: "#52b788",
      accent: "#ffffff",
      label: "Outdoor Fun Poster",
    }),
  },
  {
    file: "plush-friends-desktop.svg",
    dir: collectionsDir,
    svg: svgPanel({
      width: 1920,
      height: 1200,
      from: "#5c2d4a",
      to: "#ff8fab",
      accent: "#ffffff",
      label: "Plush Friends",
    }),
  },
  {
    file: "plush-friends-mobile.svg",
    dir: collectionsDir,
    svg: svgPanel({
      width: 780,
      height: 1200,
      from: "#5c2d4a",
      to: "#ff8fab",
      accent: "#ffffff",
      label: "Plush Friends Mobile",
    }),
  },
  {
    file: "action-zone-desktop.svg",
    dir: collectionsDir,
    svg: svgPanel({
      width: 1920,
      height: 1200,
      from: "#111111",
      to: "#444444",
      accent: "#ffffff",
      label: "Action Zone",
      shapes: `<polygon points="960,280 1180,720 740,720" fill="#ffcc33" opacity="0.35"/>`,
    }),
  },
  {
    file: "learning-lab-desktop.svg",
    dir: collectionsDir,
    svg: svgPanel({
      width: 1920,
      height: 1200,
      from: "#eef4ff",
      to: "#c7d7ff",
      accent: "#1a1a1a",
      label: "Learning Lab",
    }),
  },
  {
    file: "learning-lab-mobile.svg",
    dir: collectionsDir,
    svg: svgPanel({
      width: 780,
      height: 1200,
      from: "#eef4ff",
      to: "#c7d7ff",
      accent: "#1a1a1a",
      label: "Learning Lab Mobile",
    }),
  },
];

await mkdir(collectionsDir, { recursive: true });

for (const panel of panels) {
  await writeFile(join(panel.dir, panel.file), panel.svg, "utf8");
}

const heroMp4 = join(mediaRoot, "hero-loop.mp4");
if (!existsSync(heroMp4)) {
  try {
    execSync(
      `ffmpeg -y -f lavfi -i color=c=0x5a3fd9:s=1920x1080:d=6 -vf "format=yuv420p" "${heroMp4.replace(/\\/g, "/")}"`,
      { stdio: "ignore" },
    );
    console.log("Created hero-loop.mp4 via ffmpeg");
  } catch {
    console.warn("ffmpeg unavailable — hero video will use gradient fallback");
  }
}

console.log(`Generated ${panels.length} SVG placeholders in ${mediaRoot}`);
