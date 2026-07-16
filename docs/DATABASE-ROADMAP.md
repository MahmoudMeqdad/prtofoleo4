# Database Roadmap — IPLAY Platform

This document describes the planned database schema for future development days.

> **Status:** Draft — models will be implemented incrementally.

---

## Collection

```prisma
model Collection {
  id          String   @id @default(cuid())
  slug        String   @unique
  name        String
  description String?
  image       String?
  isActive    Boolean  @default(true)
  sortOrder   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  products Product[]
}
```

## Product

```prisma
model Product {
  id            String   @id @default(cuid())
  slug          String   @unique
  name          String
  description   String?
  collectionId  String
  isActive      Boolean  @default(false)
  sortOrder     Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  collection      Collection            @relation(fields: [collectionId], references: [id])
  media           ProductMedia[]
  pricingPolicy   ProductPricingPolicy?
  costs           ProductCost[]
}
```

## ProductMedia

```prisma
model ProductMedia {
  id        String   @id @default(cuid())
  productId String
  url       String
  alt       String?
  sortOrder Int      @default(0)
  type      MediaType @default(IMAGE)
  createdAt DateTime @default(now())

  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@index([productId])
}

enum MediaType {
  IMAGE
  VIDEO
}
```

## ProductPricingPolicy

```prisma
model ProductPricingPolicy {
  id            String   @id @default(cuid())
  productId     String   @unique
  retailPrice   Decimal
  mapPrice      Decimal?
  moq           Int      @default(1)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  tiers   PricingTier[]
}
```

## PricingTier

```prisma
model PricingTier {
  id             String   @id @default(cuid())
  policyId       String
  minQuantity    Int
  maxQuantity    Int?
  unitPrice      Decimal
  createdAt      DateTime @default(now())

  policy ProductPricingPolicy @relation(fields: [policyId], references: [id], onDelete: Cascade)

  @@index([policyId])
}
```

## ProductCost

```prisma
model ProductCost {
  id           String   @id @default(cuid())
  productId    String
  costPrice    Decimal
  currency     String   @default("SAR")
  validFrom    DateTime @default(now())
  validUntil   DateTime?
  createdAt    DateTime @default(now())

  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@index([productId])
}
```

## MarketerProfile

```prisma
model MarketerProfile {
  id             String   @id @default(cuid())
  userId         String   @unique
  referralCode   String   @unique
  commissionRate Decimal  @default(0.1)
  totalEarnings  Decimal  @default(0)
  totalPaidOut   Decimal  @default(0)
  status         AccountStatus @default(PENDING)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

## WholesaleTraderProfile

```prisma
model WholesaleTraderProfile {
  id              String       @id @default(cuid())
  userId          String       @unique
  businessName    String
  taxNumber       String?
  maxCreditLimit  Decimal?
  currentBalance  Decimal      @default(0)
  status          AccountStatus @default(PENDING)
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

## DropshippingOrder

```prisma
model DropshippingOrder {
  id              String   @id @default(cuid())
  orderNumber     String   @unique
  marketerId      String?
  customerName    String
  customerPhone   String
  customerAddress String?
  items           Json
  totalAmount     Decimal
  status          OrderStatus @default(PENDING)
  notes           String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

## WholesaleOrder

```prisma
model WholesaleOrder {
  id                String   @id @default(cuid())
  orderNumber       String   @unique
  traderId          String
  items             Json
  totalAmount       Decimal
  status            OrderStatus @default(PENDING)
  paymentTerms      String?
  notes             String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  trader WholesaleTraderProfile @relation(fields: [traderId], references: [id])
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}
```

## WalletTransaction

```prisma
model WalletTransaction {
  id          String   @id @default(cuid())
  userId      String
  type        TransactionType
  amount      Decimal
  balanceBefore Decimal
  balanceAfter  Decimal
  reference   String?
  description String?
  createdAt   DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

enum TransactionType {
  CREDIT
  DEBIT
  COMMISSION
  WITHDRAWAL
  REFUND
}
```

## WithdrawalRequest

```prisma
model WithdrawalRequest {
  id          String   @id @default(cuid())
  userId      String
  amount      Decimal
  bankAccount Json?
  status      WithdrawalStatus @default(PENDING)
  adminNote   String?
  processedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

enum WithdrawalStatus {
  PENDING
  APPROVED
  PROCESSING
  COMPLETED
  REJECTED
}
```

## InventoryTransaction

```prisma
model InventoryTransaction {
  id          String   @id @default(cuid())
  productId   String
  type        InventoryChangeType
  quantity    Int
  reference   String?
  note        String?
  createdAt   DateTime @default(now())

  @@index([productId])
}

enum InventoryChangeType {
  STOCK_IN
  STOCK_OUT
  ADJUSTMENT
  RETURN
}
```

## AuditLog

```prisma
model AuditLog {
  id          String   @id @default(cuid())
  userId      String?
  action      String
  entity      String
  entityId    String?
  details     Json?
  ipAddress   String?
  createdAt   DateTime @default(now())

  @@index([userId])
  @@index([entity, entityId])
  @@index([createdAt])
}
```
