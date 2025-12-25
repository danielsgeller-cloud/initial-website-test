export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { validatePassword } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, currentPassword, newPassword } = body;

  // Get current user
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const updates: any = {};

  // Update name if provided
  if (name !== undefined) {
    updates.name = name.trim() || null;
  }

  // Update password if both current and new are provided
  if (currentPassword && newPassword) {
    // Verify current password
    const passwordMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!passwordMatch) {
      return NextResponse.json({
        error: "Current password is incorrect"
      }, { status: 400 });
    }

    // Validate new password
    const validation = validatePassword(newPassword);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Check new password is different
    const samePassword = await bcrypt.compare(newPassword, user.passwordHash);
    if (samePassword) {
      return NextResponse.json({
        error: "New password must be different from current password"
      }, { status: 400 });
    }

    updates.passwordHash = await bcrypt.hash(newPassword, 10);
  }

  // Update user
  const updatedUser = await prisma.user.update({
    where: { email: session.user.email },
    data: updates,
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  });

  return NextResponse.json({
    ok: true,
    user: updatedUser,
  });
}
