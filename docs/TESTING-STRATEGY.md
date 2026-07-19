# Testing Strategy

Automated tests use Node's built-in test runner (web) and Jest (API). No heavy extra frontend test runner was added.

## Web (`apps/web`)

Covered in:

- `src/store/cart-types.test.ts`
- `src/lib/whatsapp-order.test.ts`
- `src/auth/auth-guards.test.ts`
- `src/auth/auth-forms.test.ts`

Includes:

- cart merge / option separation / quantity clamp
- English and Arabic WhatsApp messages
- auth route guards (pending / rejected / suspended / admin)
- registration conditional partner fields
- password letter+number rule
- public self-register role allowlist from `@iplay/shared`

Run:

```bash
npm run test --workspace=@iplay/web
npm run lint --workspace=@iplay/web
npm run typecheck --workspace=@iplay/web
npm run build --workspace=@iplay/web
```

## API (`apps/api`)

Covered in:

- `auth.service.spec.ts` — register/login/refresh/logout, customer APPROVED, partner PENDING, bcrypt, suspended/rejected blocking
- `roles.guard.spec.ts` — role + approval enforcement
- `admin-users.controller.spec.ts` — approve/reject/suspend/reactivate, self-change block, admin-on-admin restriction, invalid transitions

Run:

```bash
npm run test --workspace=@iplay/api
npm run typecheck --workspace=@iplay/api
npm run build --workspace=@iplay/api
```

## Manual / production

After API deploy: health endpoints, customer + partner registration, refresh/logout, admin approval, Arabic RTL, cart preservation, WhatsApp guest order. Screenshots via `apps/web/scripts/day06-screenshots.mjs`.
