import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { readStripeStore } from "@/lib/stripeStore";

export async function GET(req: Request) {
  try {
    await requireAdmin();
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get user statistics
  const totalUsers = await prisma.user.count();
  const verifiedUsers = await prisma.user.count({
    where: { emailVerified: { not: null } },
  });

  // Get recent users (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentUsers = await prisma.user.count({
    where: { createdAt: { gte: sevenDaysAgo } },
  });

  // Get order statistics from Stripe store
  let totalOrders = 0;
  try {
    const store = await readStripeStore();
    totalOrders = Object.keys(store).length;
  } catch (err) {
    // If store doesn't exist, totalOrders remains 0
  }

  return NextResponse.json({
    totalUsers,
    verifiedUsers,
    totalOrders,
    recentUsers,
  });
}
