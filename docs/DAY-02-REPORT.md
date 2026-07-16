# Day 2: IPLAY Visual Homepage

Status:
Awaiting review (Amendment applied)

Preview URL:
http://localhost:3000/en (redirects from `/`)

Implemented:
1. Premium visual homepage with utility bar, fixed white header, full-screen hero, editorial intro, six collection panels, and translated footer
2. Bilingual locale routing (`/en`, `/ar`) with English as default and cookie persistence
3. i18n dictionary architecture in `apps/web/src/i18n/` with shared components and translated message data
4. Design System preserved at `/dev/design-system` (robots noindex)

Homepage sections:
1. Utility Bar — brand message (translated)
2. Fixed Site Header — gray English/Arabic navigation, language switcher, search, sign in, cart
3. Full-Screen Video Hero — begins below header stack, play/pause control, scroll indicator
4. Editorial Introduction — two-column layout with locale-aware copy
5. Collection Showcases — six full-width panels with translated names and CTAs
6. Visual Footer — fully translated columns and legal links

Default language:
English

Supported languages:
English
Arabic

Locale routes:
- English: `/en` (default; `/` redirects here)
- Arabic: `/ar`

Header:
- Three-state scroll model: `top-over-hero` | `hidden` | `visible-white`
- State A (top): white utility bar + language dropdown; transparent nav over full-screen hero with white text and search pill
- State B (scroll down): entire header hidden via `translateY(-100%)` — no layout jump (fixed overlay)
- State C (scroll up): white utility bar + white nav bar, gray links, search pill, language dropdown, subtle shadow
- Hero overlap restored at top: hero is `100svh` with header fixed above content

Language switching:
- Desktop: Language dropdown in utility bar (English / العربية)
- Mobile: Language options inside mobile drawer
- Persistence method: `iplay-locale` cookie (1 year, middleware sync on locale routes)
- HTML lang update: Yes — `LocaleHtmlAttributes` sets `document.documentElement.lang`
- HTML dir update: Yes — `ltr` for English, `rtl` for Arabic

Translation coverage:
- Header: Navigation, search, sign in, cart, menu labels
- Hero: Play/pause/scroll accessible labels
- Introduction: Heading lines and paragraphs
- Collections: Names, eyebrows, CTAs (six collections)
- Footer: Heading, columns, legal links, copyright
- Accessibility labels: Language switch, menu, hero controls
- Metadata: Locale-specific title and description with alternates

Capitalization review:
- Navigation: Title Case (Collections, About, Dropshipping, Wholesale, Contact Us)
- Headings: Headline style (Reimagining Play, Every Single Day; Come Play With Us)
- CTA labels: Title Case (Explore, See More, Discover)
- Paragraphs: Sentence case throughout editorial and footer description

Visual-reference characteristics reproduced:
1. Large full-width imagery and immersive hero (no product grid)
2. Collection titles near bottom edge with small CTAs
3. Smooth Framer Motion scroll reveals with reduced-motion support

Original IPLAY elements:
1. IPLAY violet/pink/yellow palette and display typography
2. Six original temporary collection names (English + Arabic translations)
3. SVG placeholder media marked `IPLAY TEMP`

Animations:
1. Header fade/slide on load; hero media fade-in; play control scale
2. Editorial and collection viewport reveals (once)
3. Reduced-motion overrides in CSS and component hooks

Responsive behavior:
1. Desktop — fixed header, gray nav, EN | AR switcher, hero below header
2. Mobile — logo, cart, menu; language inside drawer; hero below header
3. RTL layout mirrored for Arabic via `dir="rtl"` and logical CSS properties

Accessibility:
1. Gray nav meets contrast on white header; visible focus rings
2. Translated `aria-label` values for hero, menu, and language controls
3. `aria-current="true"` on active language button

Temporary media:
1. Hero poster SVG + optional MP4 (ffmpeg unavailable locally)
2. Twelve collection SVG placeholders
3. Documented in `docs/HOMEPAGE-MEDIA-REQUIREMENTS.md`

Technical results:
- Lint: Pass
- Typecheck: Pass
- Frontend build: Pass
- Backend build: Pass (cached)
- API health: Pass (`GET /api/health`)
- Database health: Pass (`GET /api/health/database`)
- Browser console: Not verified in a clean manual session this run
- Hydration: Not verified in a clean manual session this run
- Horizontal overflow: Not observed in Puppeteer captures
- npm run test: Placeholder only

Screenshots:
- English desktop: `artifacts/day-02/desktop-viewport.png`
- English mobile: `artifacts/day-02/mobile-viewport.png`
- English desktop full page: `artifacts/day-02/desktop-full-page.png`
- English mobile full page: `artifacts/day-02/mobile-full-page.png`
- Arabic desktop: `artifacts/day-02/desktop-arabic.png`

Differences from the supplied video:
1. Fixed white header replaces transparent hero overlay (per amendment)
2. Temporary SVG media instead of final brand photography/video
3. Bilingual EN/AR architecture added beyond original video reference

Known limitations:
1. Hero MP4 not generated locally (ffmpeg unavailable) — poster fallback active
2. Collection CTAs link to `/[locale]/collections/[slug]` (404 until Day 3+)
3. Search, sign in, and cart are visual/navigation stubs only
4. Stale process on port 3000 may return errors — use current dev server or restart

Files created:
1. `apps/web/src/i18n/config.ts`, `en.ts`, `ar.ts`, `dictionaries.ts`, `types.ts`
2. `apps/web/middleware.ts`
3. `apps/web/src/app/[locale]/layout.tsx`, `page.tsx`
4. `apps/web/src/components/home/HomepageHeader.tsx` — video-accurate three-state header
5. `apps/web/src/hooks/useHeaderMode.ts` — scroll-direction detection
6. `apps/web/src/components/layout/LanguageSwitcher.tsx`, `LocaleHtmlAttributes.tsx`
7. `apps/web/src/providers/LocaleProvider.tsx`

Files modified:
1. `apps/web/src/components/home/HomepageShell.tsx` — fixed header stack, no hero overlay nav
2. `apps/web/src/components/home/VideoHero.tsx` — header offset height, translated labels
3. `apps/web/src/components/home/UtilityBar.tsx`, `EditorialIntro.tsx`, `CollectionShowcase.tsx`
4. `apps/web/src/components/layout/VisualFooter.tsx`, `MobileMenu.tsx`
5. `apps/web/src/app/layout.tsx`, `page.tsx`, `globals.css`
6. `scripts/capture-day02-screenshots.mjs`

Files removed:
1. `apps/web/src/components/home/HeroNavigation.tsx` (replaced by SiteHeader)

Day 3 work intentionally not started:
1. Collection detail pages and product catalog
2. Cart, WhatsApp ordering, authentication, wholesale/marketer flows
3. Admin dashboard, inventory, pricing, wallets

Final status:
Awaiting human visual approval
