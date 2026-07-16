# Visual Reference Comparison — IPLAY vs. Presentation Direction

Date: 2026-07-15 (Day 2)

## Reference used (inspiration only)

**Source:** [ZURU Mini Brands presentation style](https://zurutoys.com/brands/mini-brands)

Used **only** to understand presentation concepts — not to copy assets, branding,
copy, or layout literally.

## What we adopted (conceptually)

| Concept | IPLAY Day 2 implementation |
|---------|---------------------------|
| Large visual imagery | Hero placeholder at ~420px height; collection cards with 220px image area |
| Full-width sections | Hero gradient spans full viewport width; collection grid in Container |
| Distinct identity per collection | Four showcase collections with unique accent colors and taglines |
| Minimal, focused copy | Short Arabic headlines and one-line taglines per collection |
| Smooth motion | Framer Motion on hero entrance, collection scroll reveal, mobile menu spring |
| Mobile-first presentation | Responsive grid (1 → 2 → 4 columns); animated mobile drawer |
| Product presentation in collections | Card grid with image-first layout (placeholder until real media) |

## What we did **not** copy

- ZURU logos, product names, photography, or written content
- Exact color palette or brand marks
- Page structure or component hierarchy from the reference site
- Mini Brands-specific visual assets or collection naming

## IPLAY original identity (Day 2)

| Element | Value / approach |
|---------|------------------|
| Primary | `#6c4cff` (violet) |
| Secondary | `#ffcc33` (warm yellow) |
| Accent | `#ff5e8a` (pink) |
| Hero gradient | `#5a3fd9` → primary → `#ff5e8a` |
| Display font | Baloo Bhaijaan 2 |
| Body font | Noto Sans Arabic |
| Default language | Arabic (RTL) |

## Header behaviour (Day 2)

| State | Appearance |
|-------|------------|
| Home + at top of page | Transparent over hero, white logo and nav text |
| Scrolled or other routes | Solid blurred background, primary logo, standard nav |

This mirrors the reference idea of a cinematic top section without cloning its
exact transparent-header design.

## Gap analysis for future days

| Reference strength | IPLAY status after Day 2 |
|--------------------|-------------------------|
| Final photography | PlaceholderImage only — real media later (Cloudinary) |
| Dedicated collection routes | Links point to `/collections` stub — pages not built yet |
| Scroll-linked parallax | Not implemented (intentionally deferred) |
| Section-aware header colour on all sections | Only hero mode implemented |
| Product detail pages | Out of scope until later days |

## Conclusion

Day 2 establishes an **original IPLAY visual direction** inspired by the
reference's *presentation principles* (scale, colour blocks, minimal copy,
motion) while keeping all brand and content assets original. Further polish is
planned in subsequent days.
