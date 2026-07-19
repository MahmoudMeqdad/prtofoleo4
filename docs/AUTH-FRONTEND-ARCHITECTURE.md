# Auth Frontend Architecture — Velvet Kids

## Goals

- Connect the Next.js storefront to the NestJS authentication API.
- Keep guest shopping and WhatsApp ordering working without login.
- Prefer same-origin browser calls to avoid cross-site cookie issues.

## Same-origin proxy

Browser path:

```text
/api/backend/*
```

Implementation:

```text
apps/web/src/app/api/backend/[...path]/route.ts
```

Upstream base URL (server-only):

```env
BACKEND_API_URL=https://<api-host>/api
```

Fallbacks for local development: `API_URL`, then `NEXT_PUBLIC_API_URL`, then `http://localhost:4000/api`.

The proxy forwards method, body, Authorization, Cookie, and rewrites `Set-Cookie` `Path` from `/api/auth` to `/api/backend/auth` so HttpOnly refresh cookies attach to the Vercel origin.

## Token strategy

| Token | Storage | Lifetime |
|---|---|---|
| Access token | In-memory (module ref inside `AuthProvider`) | Short (`JWT_ACCESS_EXPIRES_IN`, default 15m) |
| Refresh token | HttpOnly cookie (`vk_refresh`) | Long (`JWT_REFRESH_EXPIRES_IN`, default 30d) |

- Refresh rotates and revokes the previous token.
- Logout revokes the refresh token and clears the cookie.
- One automatic retry after a successful refresh; no infinite loop.
- Refresh tokens are never written to `localStorage`, `sessionStorage`, or Zustand persistence.

## Frontend modules

```text
apps/web/src/auth/
├── AuthProvider.tsx
├── auth-client.ts
├── auth-types.ts
├── auth-errors.ts
├── auth-guards.ts
└── use-auth.ts
```

Shared roles and statuses are imported from `@iplay/shared` — no duplicate enums.

## Auth state

```ts
interface AuthState {
  user: AuthUser | null;
  status: "loading" | "authenticated" | "unauthenticated";
}
```

Actions: `register`, `login`, `logout`, `refresh`, `loadCurrentUser`.

## Routes

English / Arabic:

- `/[locale]/login`
- `/[locale]/register`
- `/[locale]/account`
- `/[locale]/account/pending`
- `/[locale]/account/rejected`
- `/[locale]/account/suspended`
- `/[locale]/admin/accounts`

Protected routes use `AuthGate` for UX redirects. Backend JWT + role + status guards remain authoritative.

## Header

`HeaderAccountControl` replaces the Coming Soon Sign In control:

- Guest → Sign In link
- Authenticated → name + account menu (My Account, Review Accounts for admins, Sign Out)
- Opening the account menu keeps the header visible

## Cart independence

Logout and login do not touch `velvet-kids-cart-v1`. Guest WhatsApp ordering remains available regardless of account status.

## API downtime

When the auth API is unavailable, public browsing continues. Auth pages surface a localized unavailable message; the rest of the storefront does not crash.
