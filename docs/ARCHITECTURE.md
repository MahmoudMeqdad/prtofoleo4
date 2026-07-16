# Architecture — IPLAY Platform

## Frontend Architecture

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand (prepared for shopping cart)
- **Server State:** TanStack Query (for backend data fetching)
- **Forms:** React Hook Form + Zod validation
- **Animation:** Framer Motion (prepared for future use)
- **Icons:** Lucide React

### Route Structure

```
/              Home — Hero + collection showcase (Day 2)
/design-system Internal design system review
/collections   Collection listing
/collections/[slug]  Single collection
/products      Product listing
/products/[slug]     Single product
/cart          Shopping cart
/dropshipping  Dropshipping information
/wholesale     Wholesale information
/login         Login page
/register      Registration page
/about         About page
/contact       Contact page
/admin/*       Admin dashboard
```

### Component Architecture

- `components/ui/` — Reusable design-system components
- `components/layout/` — Layout components (Header, Footer, MobileMenu)
- `components/home/` — Home page sections
- `components/collections/` — Collection-related components
- `components/products/` — Product-related components
- `components/cart/` — Cart-related components
- `components/marketer/` — Marketer dashboard components
- `components/wholesale/` — Wholesale dashboard components
- `components/admin/` — Admin dashboard components

## Backend Architecture

- **Framework:** NestJS 11
- **Language:** TypeScript (strict mode)
- **API Style:** REST
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Validation:** Class Validator + Zod
- **Security:** Helmet, CORS
- **Documentation:** Swagger

### Module Structure

```
modules/
├── health/        # Health check endpoints (Day 1)
├── auth/          # Authentication (future)
├── users/         # User management (future)
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
GET  /api/health              Service health check
GET  /api/health/database     Database connection check
```

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
