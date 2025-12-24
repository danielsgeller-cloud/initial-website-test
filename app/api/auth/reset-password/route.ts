import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sha256, validatePassword } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = String(body.email || "").toLowerCase().trim();
  const token = String(body.token || "");
  const newPassword = String(body.newPassword || "");

  if (!email || !token || !newPassword) {
    return NextResponse.json({
      error: "Email, token, and new password required"
    }, { status: 400 });
  }

  // Validate password strength
  const validation = validatePassword(newPassword);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  // Look up user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Invalid reset link" }, { status: 400 });
  }

  // Verify token
  const tokenHash = sha256(token);
  if (!user.resetTokenHash || user.resetTokenHash !== tokenHash) {
    return NextResponse.json({ error: "Invalid reset link" }, { status: 400 });
  }

  // Check expiration
  if (!user.resetTokenExpires || user.resetTokenExpires < new Date()) {
    return NextResponse.json({ error: "Reset link expired" }, { status: 400 });
  }

  // Hash new password and update user
  const passwordHash = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: {
      passwordHash,
      resetTokenHash: null,
      resetTokenExpires: null,
    },
  });

  return NextResponse.json({
    ok: true,
    message: "Password reset successful"
  });
}
