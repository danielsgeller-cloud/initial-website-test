export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sha256 } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const userId = String(body.userId || "");
  const token = String(body.token || "");

  if (!userId || !token) {
    return NextResponse.json({
      error: "User ID and token required"
    }, { status: 400 });
  }

  // Look up user
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return NextResponse.json({ error: "Invalid confirmation link" }, { status: 400 });
  }

  // Verify token
  const tokenHash = sha256(token);
  if (!user.pendingEmailTokenHash || user.pendingEmailTokenHash !== tokenHash) {
    return NextResponse.json({ error: "Invalid confirmation link" }, { status: 400 });
  }

  // Check expiration
  if (!user.pendingEmailExpires || user.pendingEmailExpires < new Date()) {
    return NextResponse.json({ error: "Confirmation link expired" }, { status: 400 });
  }

  // Check if pending email exists
  if (!user.pendingEmail) {
    return NextResponse.json({ error: "No pending email change" }, { status: 400 });
  }

  // Update email and clear pending fields
  await prisma.user.update({
    where: { id: userId },
    data: {
      email: user.pendingEmail,
      emailVerified: new Date(),
      pendingEmail: null,
      pendingEmailTokenHash: null,
      pendingEmailExpires: null,
    },
  });

  return NextResponse.json({
    ok: true,
    message: "Email updated successfully"
  });
}
