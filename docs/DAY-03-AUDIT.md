# Day 3 Audit — Public Pages and Collection Experience

## Existing public routes

| Route | Status |
|-------|--------|
| `/` → `/en` | Exists |
| `/[locale]` (en, ar) | Homepage exists |
| `/dev/design-system` | Internal (noindex) |
| `/design-system` | Redirect to dev |

## Missing public routes (before Day 3)

- `/[locale]/collections`
- `/[locale]/collections/[slug]` (six slugs)
- `/[locale]/about`
- `/[locale]/dropshipping`
- `/[locale]/wholesale`
- `/[locale]/contact`
- `/[locale]/careers`

## Broken internal links (before Day 3)

Linked from Header / Mega / Homepage / Footer but no `page.tsx`:

- `/collections`, `/collections/{slug}` × 6
- `/about`, `/dropshipping`, `/wholesale`, `/contact`, `/careers`
- `/sign-in`, `/cart` (interface-only — convert to controls)
- Footer reference links to remove: News, Where to buy, Safety, Patents, Conformity
- Policy links without content: Terms, Privacy, Cookies (remove clickable until approved)
- About mega: `/news` (replace with Careers)
- Social `#` placeholders

## Collection slugs (approved — do not rename)

1. `tiny-worlds`
2. `creative-studio`
3. `outdoor-fun`
4. `plush-friends`
5. `action-zone`
6. `learning-lab`

Source: `apps/web/src/config/homepage.ts`

## Existing bilingual content

- Dictionaries: `apps/web/src/i18n/en.ts`, `ar.ts`
- Locale routing + `localizedPath` / `swapLocaleInPath`
- Homepage collection names and CTAs already translated

## Reusable components

- `HomepageHeader`, `MegaMenus`, `MobileMenu`
- `VisualFooter`
- `useHeaderMode`, `useMegaMenu`, `useReducedMotion`
- Homepage media under `public/media/home/collections/`
- Fonts / CSS tokens in `globals.css`

## Planned files to create or modify

**Create**

- `apps/web/src/content/collections/*`
- `apps/web/src/content/pages/*`
- `apps/web/src/components/layout/PublicPageShell.tsx`
- `apps/web/src/components/pages/*`
- `apps/web/src/lib/metadata.ts`
- `apps/web/src/app/[locale]/collections/**`
- `apps/web/src/app/[locale]/{about,dropshipping,wholesale,contact,careers}/page.tsx`
- `apps/web/src/app/sitemap.ts`, `robots.ts`
- Docs: `DAY-03-LINK-AUDIT.md`, `DAY-03-REPORT.md`, `COLLECTION-MEDIA-REQUIREMENTS.md`, `VERCEL-GITHUB-DEPLOYMENT.md`
- Screenshots under `artifacts/day-03/`

**Modify**

- `MegaMenus.tsx`, `HomepageHeader.tsx`, `VisualFooter.tsx`
- `en.ts` / `ar.ts` (UI strings)
- `not-found.tsx`

**Preserve**

- Homepage shell, hero video, editorial, six showcases, Vercel config
