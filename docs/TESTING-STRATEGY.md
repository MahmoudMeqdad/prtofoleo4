# Testing Strategy — IPLAY Platform

## Current status (Day 1 / pre-Day 2)

| Item | Status |
|------|--------|
| Test infrastructure | **Not configured yet** |
| Test runner (Jest, Vitest, etc.) | Not installed |
| Test files (`*.test.ts`, `*.spec.ts`) | None |
| `npm run test` | **Placeholder** — prints a message and exits; does not run assertions |

The placeholder message in `apps/web` and `apps/api`:

```text
Automated tests are not configured yet. See docs/TESTING-STRATEGY.md.
```

Do **not** interpret a successful `npm run test` exit as proof of automated test
coverage. Real automated tests have **not** been executed.

## What is verified today (manual / CI-style checks)

These checks are run manually or via npm scripts and **do** provide meaningful
quality signal for the current foundation:

| Check | Command | Purpose |
|-------|---------|---------|
| Lint | `npm run lint` | ESLint across workspaces |
| Typecheck | `npm run typecheck` | TypeScript strict mode |
| Build | `npm run build` | Production builds (web + api) |
| Prisma validate | `npx prisma validate` (in `apps/api`) | Schema correctness |
| Prisma generate | `npx prisma generate` | Client generation |
| Health endpoints | `GET /api/health`, `GET /api/health/database` | API + DB connectivity |
| Responsive layout | Manual / screenshot review at 1440 px and 390 px | No horizontal overflow |
| Console / hydration | Clean browser load | No application hydration errors |
| Mobile menu | Manual interaction | Open, scroll lock, close on select |

## Phase 1 — When authentication is implemented

Add a test runner (recommended: **Vitest** for shared/web, **Jest** for NestJS
api — or Vitest everywhere for consistency) and cover:

- User registration (valid / invalid input)
- Login (success / wrong password)
- Refresh token rotation and revocation
- Logout
- Account states: `PENDING`, `APPROVED`, `REJECTED`, `SUSPENDED`
- Role-based access control (each `UserRole`)
- Unauthorized access blocked on protected routes

## Phase 2 — When orders are implemented

- Order creation (dropshipping + wholesale flows)
- Inventory validation at order time
- Status transitions (pending → confirmed → shipped → delivered)
- Cancellation and refund rules
- Marketer order isolation (marketer A cannot see marketer B orders)
- Price tampering prevention (client cannot override server price)

## Phase 3 — When pricing is implemented

- Pricing tier selection by quantity
- MOQ enforcement
- MAP (minimum advertised price) protection
- Maximum sale price caps
- Profit margin calculations
- Non-overlapping tier ranges
- Price snapshot stored on order (historical orders unchanged)

## Phase 4 — When wallet / withdrawals are implemented

- Profit credit on order completion
- Profit reversal on refund/cancel
- Withdrawal cannot exceed balance
- Idempotent withdrawal processing (no double payout)
- Wallet transaction audit trail integrity

## Recommended tooling (future)

| Layer | Suggested tool |
|-------|----------------|
| Unit / integration (API) | Jest or Vitest + `@nestjs/testing` + Supertest |
| Unit / component (web) | Vitest + React Testing Library |
| E2E (critical flows) | Playwright |
| API contract | OpenAPI snapshot tests (optional) |

## First milestone for real automated tests

The first automated test suite should land **when the authentication module is
implemented** (expected Day 3+), starting with:

1. Health controller unit tests (quick win, no auth needed).
2. Auth service integration tests against a test database.
3. One Playwright smoke test: home page loads, status widget shows connected.

Until then, rely on lint, typecheck, build, Prisma validate, and manual checks
documented in `docs/PRE-DAY-02-AUDIT.md`.

## Screenshot deliverables (from Day 2 onward)

Each review day should include:

| Capture | Dimensions |
|---------|------------|
| Desktop viewport | 1440 × 1000 |
| Mobile viewport | 390 × 844 |
| Full-page (optional) | Same width, natural scroll height |

Day 1 used full-page captures only; that remains valid for Day 1 archival.
Utility script: `scripts/capture-day02-screenshots.mjs`.
