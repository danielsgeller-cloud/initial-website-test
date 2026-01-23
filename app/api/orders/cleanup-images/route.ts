export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";

/**
 * Clean up images from old orders to prevent database bloat
 *
 * This endpoint removes imageUrls from orders older than a specified threshold.
 * Only accessible by admins.
 *
 * Query parameters:
 * - daysOld: Number of days old an order must be to have images removed (default: 90)
 * - dryRun: If "true", returns what would be cleaned without actually cleaning (default: false)
 */
export async function POST(req: Request) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 });
    }

    // Get query parameters
    const url = new URL(req.url);
    const daysOld = parseInt(url.searchParams.get("daysOld") || "90");
    const dryRun = url.searchParams.get("dryRun") === "true";

    // Calculate cutoff date
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    // Find orders with images that are older than cutoff
    const ordersToClean = await prisma.order.findMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
        imageUrls: {
          isEmpty: false, // Only orders that have images
        },
      },
      select: {
        id: true,
        createdAt: true,
        imageUrls: true,
        customerName: true,
        customerEmail: true,
      },
    });

    if (dryRun) {
      // Return what would be cleaned without actually cleaning
      const totalImages = ordersToClean.reduce((sum, order) => sum + order.imageUrls.length, 0);

      return NextResponse.json({
        success: true,
        dryRun: true,
        message: `Would clean images from ${ordersToClean.length} orders (${totalImages} total images)`,
        ordersAffected: ordersToClean.length,
        totalImages: totalImages,
        cutoffDate: cutoffDate.toISOString(),
        orders: ordersToClean.map(o => ({
          id: o.id,
          createdAt: o.createdAt,
          imageCount: o.imageUrls.length,
          customerName: o.customerName,
        })),
      });
    }

    // Actually clean the images
    const updateResults = await Promise.all(
      ordersToClean.map((order) =>
        prisma.order.update({
          where: { id: order.id },
          data: { imageUrls: [] },
        })
      )
    );

    const totalImages = ordersToClean.reduce((sum, order) => sum + order.imageUrls.length, 0);

    return NextResponse.json({
      success: true,
      message: `Successfully cleaned images from ${ordersToClean.length} orders`,
      ordersAffected: ordersToClean.length,
      totalImages: totalImages,
      cutoffDate: cutoffDate.toISOString(),
    });

  } catch (error: any) {
    console.error("Image cleanup error:", error);
    return NextResponse.json({
      error: error?.message || "Failed to clean up images"
    }, { status: 500 });
  }
}
