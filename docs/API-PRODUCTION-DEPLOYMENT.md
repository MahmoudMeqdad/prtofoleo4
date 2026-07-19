# API Production Deployment — Velvet Kids

## Status

**API not deployed yet.** Frontend auth UI was published to production on 2026-07-19:

```text
https://iplay-web.vercel.app
```

Production hosting credentials for a **persistent NestJS + PostgreSQL** environment were not available. The NestJS API is production-ready in the repository; an authorized operator must complete the external steps below.

Do not claim a live API URL until those steps succeed.

### Frontend deploy note (closeout)

Day 6 auth pages are live on Vercel. Preferred CLI deploy path is the **monorepo root** (so `@iplay/shared` resolves):

```bash
# from repository root
vercel deploy --prod --yes
```

Root `vercel.json` builds `@iplay/web`. `.vercelignore` excludes `node_modules` / `.next` / secrets.

## Recommended provider

Use any approved persistent Node.js host with HTTPS and managed PostgreSQL, for example:

- Render (Web Service + PostgreSQL)
- Railway
- Fly.io
- A VPS with Node 20+ and a managed Postgres instance

Do **not** purchase a paid plan without authorization.

## Deployment root

```text
apps/api
```

## Build command

```bash
npm ci
npx prisma generate
npm run build
```

## Start command

```bash
npx prisma migrate deploy
node dist/main
```

Or:

```bash
npm run start:prod
```

(Ensure `prisma migrate deploy` runs once per release before or as part of start.)

## Public API URL

```text
TBD — set after the host assigns a public HTTPS URL
```

Example shape once live: `https://<your-api-host>/api`

Health endpoints:

```text
GET /api/health
GET /api/health/database
```

## Required environment variables

```env
NODE_ENV=production
PORT=4000
DATABASE_URL=<production-postgresql-url>
FRONTEND_URL=https://iplay-web.vercel.app
JWT_ACCESS_SECRET=<strong-random-secret>
JWT_REFRESH_SECRET=<strong-random-secret>
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d
COOKIE_SECURE=true
COOKIE_SAME_SITE=lax
COOKIE_DOMAIN=
SUPER_ADMIN_NAME=
SUPER_ADMIN_EMAIL=
SUPER_ADMIN_PASSWORD=
SUPER_ADMIN_PHONE=
```

Rules:

- Generate new secrets; never reuse development values.
- Do not commit `.env`.
- Do not expose secrets via `NEXT_PUBLIC_*`.
- Do not print the Super Admin password in logs or docs.

## Frontend proxy configuration

On Vercel (`apps/web`), set:

```env
BACKEND_API_URL=https://<your-api-host>/api
```

Browsers call same-origin `/api/backend/*`; Next.js forwards to `BACKEND_API_URL`.

## CORS

Exact allowlist: `FRONTEND_URL` (single origin).

Production value:

```text
https://iplay-web.vercel.app
```

Credentials enabled for HttpOnly refresh cookies.

## Swagger

Disabled when `NODE_ENV=production`.

## Prisma production procedure

```bash
cd apps/api
npx prisma validate
npx prisma generate
npx prisma migrate deploy
npx prisma migrate status
```

Never run `prisma migrate dev` against production. Never reset production data.

Migrations included for Day 6:

1. `20260715100000_init_users_and_auth_foundation`
2. `20260719120000_day06_auth_profiles_and_status_history`

## Super Admin seed

```bash
cd apps/api
npm run seed:admin
```

Idempotent. Credentials from `SUPER_ADMIN_*` (or Day 5 `SEED_SUPER_ADMIN_*` aliases). Password is never printed; only the email is logged.

## Health checks

| Endpoint | Expectation |
|---|---|
| `GET /api/health` | `{ status: "ok", ... }` |
| `GET /api/health/database` | `{ status: "ok", database: "..." }` |

## Logs

Use the host’s log stream (Render/Railway/Fly logs). Do not log JWT secrets, refresh tokens, password hashes, or database credentials.

## Rollback

1. Redeploy the previous API release artifact.
2. Do **not** automatically roll back Prisma migrations unless a dedicated down migration exists and is reviewed.
3. Prefer forward-fix migrations for schema issues.

## External actions required

1. Provision production PostgreSQL.
2. Set all production environment variables on the API host.
3. Deploy `apps/api` with the build/start commands above.
4. Run `prisma migrate deploy` and `npm run seed:admin`.
5. Confirm both health endpoints over HTTPS.
6. Set `BACKEND_API_URL` on the Vercel frontend and redeploy the web app.
7. Verify CORS with `FRONTEND_URL=https://iplay-web.vercel.app`.
