-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "verifyTokenHash" TEXT,
    "verifyTokenExpires" TIMESTAMP(3),
    "resetTokenHash" TEXT,
    "resetTokenExpires" TIMESTAMP(3),
    "pendingEmail" TEXT,
    "pendingEmailTokenHash" TEXT,
    "pendingEmailExpires" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "shape" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "finish" TEXT NOT NULL,
    "mounting" TEXT,
    "combinePhotos" BOOLEAN NOT NULL DEFAULT false,
    "proofOption" TEXT,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT,
    "cemetery" TEXT,
    "shipToAddress" TEXT,
    "neededByDate" TEXT,
    "additionalNotes" TEXT,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "mountingPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "proofPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "baseFee" DOUBLE PRECISION NOT NULL DEFAULT 9,
    "combineAdjust" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
