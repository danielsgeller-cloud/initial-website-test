-- AlterTable
ALTER TABLE "User" ADD COLUMN "emailVerified" DATETIME;
ALTER TABLE "User" ADD COLUMN "verifyTokenExpires" DATETIME;
ALTER TABLE "User" ADD COLUMN "verifyTokenHash" TEXT;
