# Day 4: Velvet Kids Product, Cart and WhatsApp Ordering

Status: Approved — deployed

Production URL: https://iplay-web.vercel.app

## WhatsApp verification (final release checklist)

- `NEXT_PUBLIC_WHATSAPP_NUMBER=972592120655` configured in Vercel Production and locally; frontend redeployed.
- Order button enabled in both locales; "not configured" warning gone.
- Generated URL verified: `https://wa.me/972592120655?text=...` (window.open intercepted; nothing sent).
- English message verified: product name, quantity, unit price, subtotal, customer name/phone/city/area/address.
- Arabic message verified: fully localized including title and prices.
- Cart is not cleared before the user opens WhatsApp.
- Evidence: `artifacts/day-05/whatsapp-enabled-en.png`, `artifacts/day-05/whatsapp-enabled-ar.png`.

## Product catalog

- Total products: 6
- Collections covered: 6
- English and Arabic content: yes
- Product routes: localized static params, metadata, canonical/alternates, OG, Product JSON-LD
- Unknown slug: 404

## Collection integration

The first product-like section in each commerce collection links to its localized product page with `View Product`. Tiny Worlds and Creative Studio editorial links remain unchanged.

## Product page

Responsive gallery, thumbnails, arrows, keyboard/swipe support, required options, quantity 1–99, honest availability, Add to Cart, cart-first WhatsApp flow, features, contents, and up to four related products.

## Cart

Zustand, versioned persistence, explicit hydration, total-unit badge, accessible drawer, dedicated localized page, quantity/remove, invalid-item tolerance, empty state, estimated subtotal, and no fake shipping total.

## Customer and WhatsApp

React Hook Form + Zod fields and localized errors. Message and URL builders support both locales and omit empty optional fields. Missing/invalid `NEXT_PUBLIC_WHATSAPP_NUMBER` disables submission.

## Search and SEO

Local substring search covers localized product name, collection, and short description. Results preserve locale. Sitemap includes all localized product URLs.

## Accessibility and performance

Keyboard controls, labels, focus targets, dialog Escape/backdrop behavior, focus restoration, scroll lock, RTL end positioning, reduced motion, `next/image`, fixed media areas, primary-image priority only.

## Tests

- Cart tests: 2
- WhatsApp tests: 2
- `npm run test`: passing
- Lint/typecheck: passing
- `npm run lint`: passing
- `npm run typecheck`: passing
- `npm run build`: passing (50 generated pages)
- Browser verification: English product, required option, persisted cart count, cart drawer, dedicated cart page, and Arabic RTL product verified

## Evidence

- `artifacts/day-04/en-product-desktop.png`
- `artifacts/day-04/ar-product-desktop.png`
- `artifacts/day-04/cart-drawer-desktop.png`
- `artifacts/day-04/cart-page-desktop.png`

## Known limitations

1. Initial prices need business approval.
2. Collection artwork is reused because product photo sets are not available.
3. Orders and inventory are not persisted; confirmation occurs manually in WhatsApp.
4. WhatsApp submission remains intentionally disabled until an approved `NEXT_PUBLIC_WHATSAPP_NUMBER` is configured.

Day 5 work intentionally not started: authentication, accounts, API catalog/orders/inventory, wallets, withdrawals, and admin.

Final status: Awaiting human approval
