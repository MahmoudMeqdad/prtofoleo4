# Day 1 Report — IPLAY Platform Foundation

Date: 2026-07-15

## Summary

Day 1 established the complete technical foundation of the IPLAY platform: a
Turborepo monorepo with a Next.js 16 frontend, a NestJS 11 backend, a PostgreSQL
database managed by Prisma, an initial design system with RTL-first Arabic
support, and full verification (lint, typecheck, production builds, migration,
live health checks, and screenshots).

This day was executed across two sessions: the first session scaffolded the
project; the second session re-audited it, fixed defects (documented in
`DAY-01-AUDIT.md` → "Re-Audit Addendum"), created the database, applied the
initial migration, and performed all verification.

## Delivered

### Monorepo
- Turborepo 2 with npm workspaces (`apps/*`, `packages/*`)
- Root scripts: `dev`, `dev:web`, `dev:api`, `build`, `lint`, `typecheck`, `test`, `format`
- `packages/shared` (shared types), `packages/config` (shared constants), `packages/eslint-config`

### Frontend (`apps/web`)
- Next.js 16 + TypeScript (strict) + App Router + `src` directory
- Tailwind CSS v4 with the IPLAY design tokens as CSS variables
- Fonts via `next/font`: Baloo Bhaijaan 2 (display) + Noto Sans Arabic (body), Arabic + Latin subsets
- RTL-first: `<html lang="ar" dir="rtl">`, logical properties, `text-start`/`text-end`
- UI components: Button (5 variants, 4 sizes, link/button/loading/disabled), Container, Section, Heading, Card, Input, Badge, PlaceholderImage
- Layout: Header (desktop nav + icons), functional MobileMenu (scroll lock, close-on-select, RTL slide), Footer (links, legal, contact, copyright)
- Design-system review page at `/` with the Day 1 notice
- TanStack Query provider configured; Zustand / RHF / Zod / Framer Motion installed for later use
- `lib/api-client.ts` typed fetch wrapper + live `ConnectionStatus` component

### Backend (`apps/api`)
- NestJS 11, global `/api` prefix, ValidationPipe, Helmet, CORS, Swagger (dev only at `/api/docs`)
- Zod-based environment validation (`src/config/env.validation.ts`)
- Prisma module/service; only the `health` module is implemented, as scoped
- `GET /api/health` and `GET /api/health/database` return the specified payloads

### Database
- PostgreSQL 18 — local dev cluster at `.local/pgdata`, port 5433, trust auth (dev only)
- Prisma schema: `User`, `RefreshToken`, `UserRole`, `AccountStatus`
- Migration `20260715100000_init_users_and_auth_foundation` applied; tables verified
- Future schema documented in `DATABASE-ROADMAP.md`

## Verification Results

| Check | Result |
|-------|--------|
| `npm run lint` (all 4 workspaces) | Pass |
| `npm run typecheck` (all 4 workspaces) | Pass |
| `npm run build` (web + api production builds) | Pass |
| `npm run test` | Placeholder only — no automated test runner configured (see `docs/TESTING-STRATEGY.md`) |
| `npx prisma validate` | Pass |
| `npx prisma generate` | Pass |
| `npx prisma migrate dev` | Applied, DB in sync |
| `GET /api/health` | `{"status":"ok","service":"iplay-api","timestamp":"..."}` |
| `GET /api/health/database` | `{"status":"ok","database":"connected"}` |
| Frontend status widget | Frontend / API / Database all show "متصل" from live endpoints |
| Mobile menu | Opens, locks body scroll, closes on link select, correct RTL slide |
| Horizontal overflow | None at 1440 px or 390 px |

## Screenshots

- [Desktop screenshot](../artifacts/day-01/desktop.png) — `artifacts/day-01/desktop.png`, 1440 px viewport
- [Mobile screenshot](../artifacts/day-01/mobile.png) — `artifacts/day-01/mobile.png`, 390 px viewport

![Desktop screenshot](../artifacts/day-01/desktop.png)

![Mobile screenshot](../artifacts/day-01/mobile.png)

## Known Limitations

1. Docker is not installed on this machine — `docker/docker-compose.yml` exists for other environments; locally a dedicated PostgreSQL 18 cluster on port 5433 is used instead (see README). It must be restarted after a reboot with `pg_ctl ... start`.
2. The system-wide PostgreSQL service on port 5432 was left untouched (its credentials are not known to the project).
3. Tests are placeholder scripts; a real test runner will be added when there is logic worth testing.
4. A transient hydration warning observed during automated browser inspection was caused by the inspection tool injecting attributes before hydration — a clean page load shows no console errors or hydration issues.

## Not Implemented (by design, per Day 1 scope)

Home page / Hero, collection and product pages, cart, WhatsApp ordering,
authentication, registration, orders, inventory, pricing tiers, marketer and
wholesale systems, wallets, withdrawals, admin dashboard, Cloudinary, payments,
delivery integration, deployment.

## Next: Day 2

See `DAY-02-SCOPE.md`. Day 2 starts only after Day 1 review and approval.
