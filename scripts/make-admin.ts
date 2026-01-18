/**
 * Utility script to promote a user to ADMIN role
 *
 * Usage:
 *   npx tsx scripts/make-admin.ts <email>
 *
 * Example:
 *   npx tsx scripts/make-admin.ts admin@example.com
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function makeAdmin(email: string) {
  try {
    console.log(`Looking for user: ${email}`);

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      console.error(`ERROR: User with email "${email}" not found.`);
      console.log("\nPlease register the account first, then run this script.");
      process.exit(1);
    }

    if (user.role === "ADMIN") {
      console.log(`User "${email}" is already an admin.`);
      process.exit(0);
    }

    // Update user role to ADMIN
    await prisma.user.update({
      where: { email: email.toLowerCase().trim() },
      data: { role: "ADMIN" },
    });

    console.log(`✓ Successfully promoted "${email}" to ADMIN role.`);
    console.log("\nYou can now log in to the admin panel at /admin");
  } catch (error) {
    console.error("ERROR:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Get email from command line arguments
const email = process.argv[2];

if (!email) {
  console.error("ERROR: Please provide an email address.");
  console.log("\nUsage:");
  console.log("  npx tsx scripts/make-admin.ts <email>");
  console.log("\nExample:");
  console.log("  npx tsx scripts/make-admin.ts admin@example.com");
  process.exit(1);
}

makeAdmin(email);
