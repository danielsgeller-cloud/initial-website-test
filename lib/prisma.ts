import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Log DATABASE_URL availability (will help debug)
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not defined in environment variables!");
  console.error("Available env vars:", Object.keys(process.env).filter(key => key.includes('DATABASE') || key.includes('NEXT')));
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
