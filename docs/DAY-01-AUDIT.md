# Day 1 Audit — IPLAY Platform

## Initial State of the Project

The project workspace directory was empty — a greenfield project with no existing files, configurations, or applications.

## Existing Files and Applications

- **None.** The directory contained zero files.

## Existing Technologies

- **None.** No package manager, framework, or library was pre-installed.

## Problems Discovered

| Problem | Status |
|---------|--------|
| No project structure existed | Resolved by creating a Turborepo monorepo |
| No package manager configured | npm (v11.13.0) used — the only manager available |
| No Node.js project initialized | Created root package.json with workspaces |
| Docker not installed on the system | docker-compose.yml created for reference; manual PostgreSQL setup documented |
| No database available | PostgreSQL will need to be installed locally |

## Technical Decisions Made

| Decision | Rationale |
|----------|-----------|
| **Turborepo** chosen as monorepo tool | Specified in the requirements; suitable for managing multiple apps |
| **npm** as package manager | Already available on the system (v11.13.0) |
| **PostgreSQL** as the database | Specified in requirements |
| **Next.js + App Router** for frontend | Specified in requirements |
| **NestJS** for backend | Specified in requirements |
| **Prisma** as ORM | Specified in requirements |
| **src directory** for frontend | Cleaner separation as specified |
| **Arabic as default language** | RTL-first approach as specified |
| **Manual PostgreSQL setup** documented | Docker not available on this system |

## Files Preserved

- **None.** The project was created from scratch.

## Files Modified

- **None.** All files were newly created.

---

## Re-Audit Addendum (second session, same day)

A follow-up session re-audited the scaffold created above and found and fixed the
following defects before verification:

| Defect | Fix |
|--------|-----|
| `turbo.json` used the Turborepo 1.x `pipeline` key; Turbo 2.x requires `tasks`, so every `turbo` command would fail | Renamed the key to `tasks` |
| `.gitignore` mistakenly ignored `turbo.json` and did not ignore `.turbo/` | Corrected both entries |
| `main.ts` excluded `health` from the `/api` global prefix, so the required `GET /api/health` endpoint would return 404 | Removed the exclusion; also removed an unused `VersioningType` import |
| No environment-variable validation existed in the API (required by scope) | Added `src/config/env.validation.ts` (Zod) wired into `ConfigModule.forRoot({ validate })` |
| `apps/api` had no ESLint configuration, so `npm run lint` failed there | Added a self-contained `.eslintrc.js` (ESLint 8 + @typescript-eslint) |
| `apps/web` lint script used `next lint`, which was removed in Next.js 16, and `eslint-config-next@16` requires ESLint >= 9 while ESLint 8.57 was installed | Changed the script to `eslint src`, bumped `eslint` to `^9`, removed `@eslint/eslintrc`, and rewrote `eslint.config.mjs` to use the native flat config exported by `eslint-config-next/core-web-vitals` |
| `--font-display` / `--font-body` in `globals.css` referenced themselves (circular `var()`), relying on cascade-layer ordering to accidentally work | Renamed the `next/font` variables to `--font-display-base` / `--font-body-base` and referenced them from the theme variables |
| Header used `var(--header-height)`, which was never defined | Added `--header-height: 5rem` to the theme |
| Mobile menu slide animation was inverted in RTL (the default direction): the closed panel translated into the viewport instead of out of it | Closed state now uses `ltr:-translate-x-full rtl:translate-x-full` |
| `PlaceholderImage` typed `width`/`height` as `number` while the design-system page passes `"100%"` — a TypeScript build error | Widened both props to `number \| string` |
| `ConnectionStatus` declared an unused `setFrontend` state setter (lint error) and used a physical `ml-1` margin | Made the frontend state a constant and switched to the logical `me-1` |
| `docs/ARCHITECTURE.md` said "Next.js 15" while Next.js 16 is installed | Corrected the version |
| The initial Prisma migration had never been created | Authored `prisma/migrations/20260715100000_init_users_and_auth_foundation/migration.sql` plus `migration_lock.toml` matching the schema; applied successfully with `prisma migrate dev` |

### Database decision (re-audit)

Docker is not installed on this machine, and the pre-existing system PostgreSQL
service on port 5432 requires credentials that are not available to the
project. A dedicated PostgreSQL 18 dev cluster was therefore initialized inside
the repository at `.local/pgdata` (git-ignored), listening on port **5433**
with trust authentication (local development only). `DATABASE_URL` was updated
accordingly. The Docker compose file remains available for environments where
Docker exists.

---

## Pre-Day-2 Audit (2026-07-15)

Before Day 2, four review notes were closed:

1. **Git ignore** — `.local/` and env/secrets confirmed ignored; explicit rules added to `.gitignore`.
2. **PostgreSQL security** — verified localhost-only on port 5433; documented in `docs/LOCAL-POSTGRESQL-SECURITY.md`.
3. **Tests** — confirmed placeholder scripts; strategy documented in `docs/TESTING-STRATEGY.md`; Day 1 report wording corrected.
4. **Screenshots** — visually reviewed; paths are relative; see `docs/DAY-01-VISUAL-REVIEW.md`.

Full record: `docs/PRE-DAY-02-AUDIT.md`.
