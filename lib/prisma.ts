import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __PIC_PRISMA__: PrismaClient | undefined;
}

/**
 * Get or create Prisma Client instance.
 * Uses connection pooling and caches the instance globally.
 * DATABASE_URL is read automatically from env by Prisma via schema.prisma
 */
function getPrismaClient(): PrismaClient {
  if (!globalThis.__PIC_PRISMA__) {
    globalThis.__PIC_PRISMA__ = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }
  return globalThis.__PIC_PRISMA__;
}

export const prisma = getPrismaClient();

// Cleanup on hot reload in development
if (process.env.NODE_ENV !== 'production') {
  if (globalThis.__PIC_PRISMA__) {
    globalThis.__PIC_PRISMA__.$disconnect();
  }
}
