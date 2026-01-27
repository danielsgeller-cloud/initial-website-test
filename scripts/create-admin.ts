/**
 * Script to create an admin user directly
 *
 * Usage:
 *   npx tsx scripts/create-admin.ts
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createAdmin() {
  const email = "admin@pictureinceramicllc.com";
  const password = "PIC2024Admin!Secure";
  const name = "Admin";

  try {
    console.log("Creating admin user...");

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      // Update existing user to admin
      await prisma.user.update({
        where: { email: email.toLowerCase() },
        data: {
          role: "ADMIN",
          emailVerified: new Date(), // Mark as verified
        },
      });
      console.log(`✓ User "${email}" already exists. Updated to ADMIN role.`);
    } else {
      // Create new admin user
      const passwordHash = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          name,
          passwordHash,
          role: "ADMIN",
          emailVerified: new Date(), // Auto-verify admin
        },
      });

      console.log(`✓ Successfully created admin user.`);
    }

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("  ADMIN CREDENTIALS");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`  Email:    ${email}`);
    console.log(`  Password: ${password}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    console.log("  Login at: /login");
    console.log("  Admin panel: /admin");
    console.log("\n⚠️  IMPORTANT: Change this password after first login!\n");

  } catch (error) {
    console.error("ERROR:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
