-- CreateTable
CREATE TABLE "MarketerProfile" (
    "userId" TEXT NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "businessOrPageName" TEXT NOT NULL,
    "facebookPage" TEXT,
    "instagramPage" TEXT,
    "marketingMethod" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketerProfile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "WholesaleTraderProfile" (
    "userId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessType" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "expectedOrderVolume" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WholesaleTraderProfile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "AccountStatusHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "previousStatus" "AccountStatus" NOT NULL,
    "newStatus" "AccountStatus" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccountStatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AccountStatusHistory_userId_idx" ON "AccountStatusHistory"("userId");

-- CreateIndex
CREATE INDEX "AccountStatusHistory_reviewerId_idx" ON "AccountStatusHistory"("reviewerId");

-- CreateIndex
CREATE INDEX "AccountStatusHistory_createdAt_idx" ON "AccountStatusHistory"("createdAt");

-- AddForeignKey
ALTER TABLE "MarketerProfile" ADD CONSTRAINT "MarketerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WholesaleTraderProfile" ADD CONSTRAINT "WholesaleTraderProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountStatusHistory" ADD CONSTRAINT "AccountStatusHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountStatusHistory" ADD CONSTRAINT "AccountStatusHistory_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
