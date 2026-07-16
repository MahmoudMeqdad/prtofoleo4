# Day 3 Link Audit

Base URL: http://localhost:3010

Generated: 2026-07-16T12:33:14.373Z

Method: HTTP status checks for required public routes (curl/fetch). Playwright crawl available via `scripts/day03-link-audit.mjs` when browsers are installed.

## Summary

- Total routes checked: 30
- Valid: 29
- Broken: 0
- Expected not-found: 1
- External links: 0 (social controls are non-navigating)
- Intentionally unavailable controls: Search, Sign In, Cart (coming-soon dialog)

## Broken internal links

_None_

## Route results

| Route | Status |
|-------|--------|
| `/en` | 200 |
| `/ar` | 200 |
| `/en/collections` | 200 |
| `/ar/collections` | 200 |
| `/en/about` | 200 |
| `/ar/about` | 200 |
| `/en/dropshipping` | 200 |
| `/ar/dropshipping` | 200 |
| `/en/wholesale` | 200 |
| `/ar/wholesale` | 200 |
| `/en/contact` | 200 |
| `/ar/contact` | 200 |
| `/en/careers` | 200 |
| `/ar/careers` | 200 |
| `/en/collections/tiny-worlds` | 200 |
| `/en/collections/creative-studio` | 200 |
| `/en/collections/outdoor-fun` | 200 |
| `/en/collections/plush-friends` | 200 |
| `/en/collections/action-zone` | 200 |
| `/en/collections/learning-lab` | 200 |
| `/ar/collections/tiny-worlds` | 200 |
| `/ar/collections/creative-studio` | 200 |
| `/ar/collections/outdoor-fun` | 200 |
| `/ar/collections/plush-friends` | 200 |
| `/ar/collections/action-zone` | 200 |
| `/ar/collections/learning-lab` | 200 |
| `/en/collections/not-a-real-slug` | 404 |
| `/sitemap.xml` | 200 |
| `/robots.txt` | 200 |
| `/media/home/hero-loop.mp4` | 200 |

## Footer / Header notes

- Footer reference links removed: News, Where to Buy, Recalls & Safety, Patents, Declaration of Conformity
- Policy links removed until approved legal copy exists
- About mega menu: About, Contact, Careers
- Collection mega + See More: locale-preserving `/collections/[slug]`
