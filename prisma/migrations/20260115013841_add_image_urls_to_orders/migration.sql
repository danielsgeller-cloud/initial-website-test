-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "imageUrls" TEXT[] DEFAULT ARRAY[]::TEXT[];
