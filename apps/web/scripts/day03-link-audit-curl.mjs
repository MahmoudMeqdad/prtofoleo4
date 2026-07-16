import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.AUDIT_BASE_URL || "http://localhost:3010";

const routes = [
  "/en",
  "/ar",
  "/en/collections",
  "/ar/collections",
  "/en/about",
  "/ar/about",
  "/en/dropshipping",
  "/ar/dropshipping",
  "/en/wholesale",
  "/ar/wholesale",
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
  "/sitemap.xml",
  "/robots.txt",
  "/media/home/hero-loop.mp4",
];

async function check(route) {
  const res = await fetch(`${BASE}${route}`, { redirect: "manual" });
  return res.status;
}

async function main() {
  const results = [];
  for (const route of routes) {
    const status = await check(route);
    results.push({ route, status });
    console.log(status, route);
  }

  const expected404 = results.filter(
    (r) => r.route === "/en/collections/not-a-real-slug",
  );
  const broken = results.filter(
    (r) =>
      r.route !== "/en/collections/not-a-real-slug" &&
      (r.status >= 400 || r.status === 0),
  );
  const valid = results.filter(
    (r) =>
      r.route !== "/en/collections/not-a-real-slug" &&
      r.status > 0 &&
      r.status < 400,
  );

  const md = `# Day 3 Link Audit

Base URL: ${BASE}

Generated: ${new Date().toISOString()}

Method: HTTP status checks for required public routes (curl/fetch). Playwright crawl available via \`scripts/day03-link-audit.mjs\` when browsers are installed.

## Summary

- Total routes checked: ${results.length}
- Valid: ${valid.length}
- Broken: ${broken.length}
- Expected not-found: ${expected404.filter((r) => r.status === 404).length}
- External links: 0 (social controls are non-navigating)
- Intentionally unavailable controls: Search, Sign In, Cart (coming-soon dialog)

## Broken internal links

${broken.length === 0 ? "_None_" : broken.map((r) => `- \`${r.route}\` → ${r.status}`).join("\n")}

## Route results

| Route | Status |
|-------|--------|
${results.map((r) => `| \`${r.route}\` | ${r.status} |`).join("\n")}

## Footer / Header notes

- Footer reference links removed: News, Where to Buy, Recalls & Safety, Patents, Declaration of Conformity
- Policy links removed until approved legal copy exists
- About mega menu: About, Contact, Careers
- Collection mega + See More: locale-preserving \`/collections/[slug]\`
`;

  const outDir = path.resolve(process.cwd(), "../../docs");
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "DAY-03-LINK-AUDIT.md"), md, "utf8");
  console.log("Wrote docs/DAY-03-LINK-AUDIT.md");
  if (broken.length) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
