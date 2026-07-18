# Day 4 Audit — Products, Cart and WhatsApp

## Current product-like content

The six collection files each contain a collection hero plus three story sections. The first story in each collection is the closest existing product-like entry; the remaining entries are editorial narratives. Tiny Worlds and Creative Studio also have English editorial detail routes and must remain editorial.

Existing names selected for the initial catalog: Play at a Smaller Scale, Make Something New, Move Freely, Comfort First, Feel the Pace, and Stay Curious.

## Assets and relationships

Only project-owned SVG collection artwork exists under `public/media/home/collections`. There are no dedicated product photo sets, approved SKUs, inventory feeds, compare-at prices, or videos. Each initial product therefore reuses its collection image and links back to its source collection.

## Existing CTA behavior

The shared product showcase sends `Where To Buy` to Contact. Tiny Worlds and Creative Studio `See More` cards correctly point to editorial detail routes and must stay unchanged.

## Existing commerce controls

- Cart: no store, persistence, drawer, page, or count; the homepage header opens a Coming Soon dialog.
- Search: no catalog search; the homepage header opens a Coming Soon dialog.
- Sign In: Coming Soon and intentionally remains out of Day 4 scope.
- Zustand, React Hook Form, and Zod are already installed.

## Files planned

- Product catalog and product route.
- Product gallery, options, quantity, related products, and purchase controls.
- Versioned Zustand cart store, drawer, header badge, and cart page.
- Customer form, currency utility, WhatsApp message/URL builder.
- Localized catalog search.
- Tests, sitemap additions, screenshots, and Day 4 documentation.

## Content gaps

There are no approved business prices, product-specific Arabic marketing assets, SKUs, option matrices, stock counts, or WhatsApp number in source control. Initial catalog prices are explicit local catalog values for review; no discounts or stock quantities are claimed. Availability and delivery remain subject to WhatsApp confirmation.
