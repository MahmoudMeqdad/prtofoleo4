# Architecture — IPLAY Platform

## Frontend Architecture

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand (shopping cart); AuthProvider for session
- **Server State:** TanStack Query (prepared)
- **Forms:** React Hook Form + Zod validation
- **Animation:** Framer Motion (prepared for future use)
- **Icons:** Lucide React
- **Auth proxy:** `/api/backend/*` → NestJS API (`BACKEND_API_URL`)

### Route Structure

```
/[locale]                 Home — Hero + collection showcase
/[locale]/collections     Brand listing
/[locale]/collections/[slug]
/[locale]/products/[slug]
/[locale]/cart            Shopping cart + WhatsApp order
/[locale]/login           Sign in
/[locale]/register        Public registration
/[locale]/account         Approved account profile
/[locale]/account/pending Partner pending status
/[locale]/account/rejected
/[locale]/account/suspended
/[locale]/admin/accounts  Minimal account review (ADMIN / SUPER_ADMIN)
/[locale]/about
/[locale]/contact
/design-system            Internal design system review
```

### Component Architecture

- `components/ui/` — Reusable design-system components
- `components/layout/` — Layout components (Header, Footer, MobileMenu)
- `components/home/` — Home page sections
- `components/auth/` — Login, register, account, admin review
- `components/collections/` — Collection-related components
- `components/products/` — Product-related components
- `components/cart/` — Cart-related components
- `auth/` — AuthProvider, auth client, guards, error mapping

## Backend Architecture

- **Framework:** NestJS 11
- **Language:** TypeScript (strict mode)
- **API Style:** REST
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Validation:** Class Validator + Zod env validation
- **Security:** Helmet, CORS allowlist, throttling, HttpOnly refresh cookies
- **Documentation:** Swagger (non-production only)

### Module Structure

```
modules/
├── health/        # Health check endpoints
├── auth/          # Registration, login, refresh, logout, /me
├── users/         # User + partner profile helpers
├── admin/         # Account listing and status updates
├── products/      # Product management (future)
├── collections/   # Collection management (future)
├── orders/        # Order management (future)
├── inventory/     # Inventory management (future)
├── marketers/     # Marketer system (future)
├── wholesale/     # Wholesale system (future)
├── wallets/       # Wallet management (future)
└── withdrawals/   # Withdrawal requests (future)
```

### API Endpoints

```
GET  /api/health
GET  /api/health/database
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/me
GET  /api/admin/users
PATCH /api/admin/users/:id/status
```

Public brand name: **Velvet Kids**. Internal monorepo name remains `iplay`.

### API Convention

- Global prefix: `/api`
- Standard RESTful paths
- JSON request/response
- Bearer token authentication (future)
- Consistent error response format

## Database Architecture

- **Provider:** PostgreSQL
- **ORM:** Prisma
- **Naming:** snake_case tables, camelCase fields in Prisma
- **IDs:** CUID for public IDs, auto-increment for internal IDs

### Current Models (Day 1)

- `User` — User accounts with roles and status
- `RefreshToken` — JWT refresh token management

### Future Models

See [DATABASE-ROADMAP.md](./DATABASE-ROADMAP.md) for the complete planned schema.

## Shared Package

The `@iplay/shared` package contains:

- Shared TypeScript types (UserRole, AccountStatus, etc.)
- Health API response types
- Shared constants

## Future Authentication

- JWT-based authentication (access + refresh tokens)
- Passwords hashed with bcrypt (or similar)
- Role-based access control
- Protected routes on both frontend and backend

## Future Product System

- Products organized into collections
- Multiple media assets per product
- Pricing tiers for wholesale and marketer pricing
- MAP pricing protection
- Inventory tracking per variant

## Future Order System

- Dropshipping orders
- Wholesale orders
- WhatsApp integration for order notifications
- Order status tracking

## Future Inventory

- Stock tracking per product variant
- Low stock alerts
- Inventory transaction log

## Future Marketer System

- Marketer registration and approval
- Unique referral links
- Commission-based profit
- Wallet balance
- Withdrawal requests

## Future Admin Dashboard

- Centralized management
- User management
- Product and collection CRUD
- Order management
- Marketer and wholesale management
- Analytics and reports
