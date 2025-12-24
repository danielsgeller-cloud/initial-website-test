import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function makePrisma() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    // Avoid import-time crashes that cause Next to return HTML 500 pages.
    // Throw only when code actually tries to use prisma (inside route handler try/catch).
    return new Proxy(
      {},
      {
        get() {
          throw new Error("DATABASE_URL is missing at runtime (process.env.DATABASE_URL is empty).");
        },
      }
    ) as unknown as PrismaClient;
  }

  return new PrismaClient({ datasources: { db: { url } } });
}

export const prisma = globalForPrisma.prisma ?? makePrisma();

if (process.env.NODE_ENV !== "production" && !(prisma as any).__isProxy) {
  globalForPrisma.prisma = prisma;
}
