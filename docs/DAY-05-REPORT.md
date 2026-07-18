# Day 5: Authentication, Roles, and Account-Approval Foundation

Status: Awaiting review

Scope honored: authentication, roles, and account approval only. Order persistence, inventory accounting, marketer profits, withdrawals, and the full admin dashboard were intentionally not started.

## Data model

- Reused the existing Prisma schema (no new migration needed): `User` with `UserRole` (7 roles) and `AccountStatus` (`PENDING` default, `APPROVED`, `REJECTED`, `SUSPENDED`), plus `RefreshToken` with hash, expiry, and revocation.

## Auth module (`apps/api/src/modules/auth`)

- `POST /api/auth/register` — public self-registration limited to `CUSTOMER`, `MARKETER`, `WHOLESALE_TRADER`. Staff/admin roles cannot self-register.
  - Customers are created `APPROVED` (immediate use).
  - Marketers and wholesale traders are created `PENDING` (admin approval required).
- `POST /api/auth/login` — bcrypt verification (12 rounds). `SUSPENDED`/`REJECTED` accounts are blocked; `PENDING` accounts may sign in to check status, but privileged routes require approval.
- `POST /api/auth/refresh` — opaque 48-byte refresh tokens, stored as SHA-256 hashes, single-use rotation (old token revoked on every refresh).
- `POST /api/auth/logout` — revokes the presented refresh token.
- `GET /api/auth/me` — current profile including role and approval status.
- Access tokens: JWT signed with `JWT_ACCESS_SECRET`, payload `{ sub, email, role, status }`, expiry from `JWT_ACCESS_EXPIRES_IN`.
- Password hashes are never returned by any endpoint (`SafeUser` mapping).

## Authorization primitives

- `JwtAuthGuard` — Bearer-token verification, attaches `request.user`.
- `RolesGuard` + `@Roles(...)` — role membership AND `APPROVED` status enforced together.
- `@CurrentUser()` parameter decorator.

## Account approval (`apps/api/src/modules/admin`)

- `GET /api/admin/users?status=PENDING&role=...&page=&pageSize=` — paginated account listing for review queues.
- `PATCH /api/admin/users/:id/status` — body `{ "status": "APPROVED" | "REJECTED" | "SUSPENDED" }`.
- Restricted to `ADMIN` / `SUPER_ADMIN`. Safety rules: admins cannot change their own status; only a `SUPER_ADMIN` can act on admin-level accounts.

## Super admin bootstrap

- `npm run seed:admin` (apps/api) — idempotent seed from `SEED_SUPER_ADMIN_EMAIL` / `SEED_SUPER_ADMIN_PASSWORD` (min 12 chars) / optional `SEED_SUPER_ADMIN_NAME`. Added to `apps/api/.env.example`.

## Tests

- Jest configured for the API workspace (`jest.config.js`, ts-jest); `npm run test` now runs real tests.
- 22 tests passing across 3 suites:
  - `auth.service.spec.ts` — duplicate email rejection, customer auto-approval, marketer/wholesale PENDING, bcrypt hashing, wrong-password and unknown-email rejection, suspended/rejected blocking, PENDING login allowed, verifiable JWT payload, refresh rejection (unknown/revoked/expired), rotation, logout revocation.
  - `roles.guard.spec.ts` — no-metadata passthrough, role allow/deny, unapproved denial, unauthenticated denial.
  - `admin-users.controller.spec.ts` — approval flow, self-change block, 404, admin-on-admin restriction, super-admin override.

## Verification

- `npm run typecheck`: passing
- `npm run lint`: passing
- `npm run test`: passing (22/22)
- `npm run build`: passing

Live end-to-end smoke test (register → approve → role-gated access against local PostgreSQL) was prepared but could not be executed in this session because the local shell environment stopped responding; it should be run once before Day 5 sign-off:

1. Start local PostgreSQL (port 5433), `npx prisma migrate deploy`, `npm run dev` in apps/api.
2. Register a marketer (expect PENDING), login, `GET /auth/me`, refresh rotation.
3. Seed super admin, list `?status=PENDING`, approve the marketer, confirm 403 for non-admin on admin routes.

## Known limitations

1. API is still local-only (not deployed); the web frontend does not consume auth yet — the Sign In control remains "Coming Soon" by design until the API is hosted.
2. Marketer/wholesale profile tables (from `docs/DATABASE-ROADMAP.md`) remain future work; approval currently acts on the `User` record.
3. No email notifications on approval/rejection yet.
4. Rate limiting/lockout on login attempts deferred.

Day 6+ work intentionally not started: order persistence, inventory accounting, marketer profits, withdrawals, full admin dashboard.

Final status: Awaiting human approval
