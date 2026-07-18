import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.AUDIT_BASE_URL || "http://localhost:3000";
const START_PAGES = [`${BASE}/en`, `${BASE}/ar`, `${BASE}/en/collections`];

const INTENTIONALLY_UNAVAILABLE = new Set([
  "search",
  "sign in",
  "cart",
  "تسجيل الدخول",
  "السلة",
  "البحث",
]);

function normalizeHref(href, pageUrl) {
  if (!href) return null;
  if (
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("javascript:")
  ) {
    return { type: "special", href };
  }
  if (href.startsWith("#")) return { type: "hash", href };
  try {
    const url = new URL(href, pageUrl);
    if (url.origin !== new URL(BASE).origin) {
      return { type: "external", href: url.href };
    }
    return { type: "internal", href: url.pathname + url.search };
  } catch {
    return null;
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const discovered = new Set();
  const queue = [...START_PAGES];
  const internal = new Map();
  const external = [];
  const special = [];

  while (queue.length) {
    const url = queue.shift();
    if (discovered.has(url)) continue;
    discovered.add(url);

    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    const status = response?.status() ?? 0;
    internal.set(new URL(url).pathname, status);

    if (status >= 400) continue;

    const anchors = await page.$$eval("a[href]", (nodes) =>
      nodes.map((node) => ({
        href: node.getAttribute("href"),
        text: (node.textContent || "").trim().slice(0, 80),
      })),
    );

    for (const anchor of anchors) {
      const parsed = normalizeHref(anchor.href, url);
      if (!parsed) continue;
      if (parsed.type === "external") {
        external.push(parsed.href);
        continue;
      }
      if (parsed.type === "special" || parsed.type === "hash") {
        special.push(parsed.href);
        continue;
      }
      const next = `${BASE}${parsed.href}`;
      if (!discovered.has(next) && !queue.includes(next)) {
        // Only crawl public locale pages we care about for Day 3
        if (
          parsed.href.startsWith("/en") ||
          parsed.href.startsWith("/ar") ||
          parsed.href === "/"
        ) {
          if (
            !parsed.href.startsWith("/dev") &&
            !parsed.href.startsWith("/design-system")
          ) {
            queue.push(next);
          }
        }
      }
      if (!internal.has(parsed.href)) {
        const check = await page.request.get(`${BASE}${parsed.href}`);
        internal.set(parsed.href, check.status());
      }
    }
  }

  // Explicit Day 3 routes
  const required = [
    "/en/collections",
    "/ar/collections",
    "/en/about",
    "/ar/about",
    "/en/contact",
    "/ar/contact",
    "/en/careers",
    "/ar/careers",
    "/en/collections/tiny-worlds",
    "/en/collections/creative-studio",
    "/en/collections/outdoor-fun",
    "/en/collections/plush-friends",
    "/en/collections/action-zone",
    "/en/collections/learning-lab",
    "/ar/collections/tiny-worlds",
    "/ar/collections/creative-studio",
    "/ar/collections/outdoor-fun",
    "/ar/collections/plush-friends",
    "/ar/collections/action-zone",
    "/ar/collections/learning-lab",
    "/en/collections/not-a-real-slug",
  ];

  for (const route of required) {
    const res = await page.request.get(`${BASE}${route}`);
    internal.set(route, res.status());
  }

  await browser.close();

  const entries = [...internal.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  const valid = entries.filter(([, s]) => s >= 200 && s < 400);
  const broken = entries.filter(
    ([pathName, s]) =>
      s >= 400 && pathName !== "/en/collections/not-a-real-slug",
  );
  const expectedNotFound = entries.filter(
    ([pathName, s]) =>
      pathName === "/en/collections/not-a-real-slug" && s === 404,
  );

  const md = `# Day 3 Link Audit

Base URL: ${BASE}

Generated: ${new Date().toISOString()}

## Summary

- Total internal paths checked: ${entries.length}
- Valid (2xx/3xx): ${valid.length}
- Broken (avoidable 4xx/5xx): ${broken.length}
- Expected not-found: ${expectedNotFound.length}
- External links found: ${[...new Set(external)].length}
- Hash/special links: ${[...new Set(special)].length}

## Intentionally unavailable controls

Search, Sign In, and Cart open a coming-soon dialog and do not navigate to routes.

## Expected not-found

| Path | Status |
|------|--------|
${expectedNotFound.map(([p, s]) => `| \`${p}\` | ${s} |`).join("\n") || "| _(missing)_ | |"}

## Broken internal links

${
  broken.length === 0
    ? "_None_"
    : broken.map(([p, s]) => `- \`${p}\` → ${s}`).join("\n")
}

## Valid sample (public Day 3 routes)

${required
  .filter((r) => r !== "/en/collections/not-a-real-slug")
  .map((r) => `- \`${r}\` → ${internal.get(r) ?? "n/a"}`)
  .join("\n")}

## Notes

- Design system and \`/dev\` routes are excluded from crawl expansion.
- Social icons are non-navigating disabled controls.
`;

  const outDir = path.resolve(process.cwd(), "../../docs");
  await mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, "DAY-03-LINK-AUDIT.md");
  await writeFile(outFile, md, "utf8");
  console.log(`Wrote ${outFile}`);
  console.log(`Broken: ${broken.length}`);
  if (broken.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
