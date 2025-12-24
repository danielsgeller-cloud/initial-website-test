import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";
import { sha256 } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = String(body.email || "").toLowerCase().trim();
  const password = String(body.password || "");
  const name = body.name ? String(body.name).trim() : null;

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing?.emailVerified) {
    return NextResponse.json({ error: "Email already registered" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const token = crypto.randomBytes(32).toString("hex");
  const verifyTokenHash = sha256(token);
  const verifyTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name: name ?? undefined, verifyTokenHash, verifyTokenExpires },
    create: { email, passwordHash, name: name ?? undefined, verifyTokenHash, verifyTokenExpires },
  });

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000";

  const verifyUrl = `${baseUrl}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

  await sendEmail({
    to: email,
    subject: "Confirm your Pictures in Ceramic account",
    text:
      `Click to confirm your email:\n\n${verifyUrl}\n\n` +
      `This link expires in 1 hour.\n\nIf you did not request this, ignore this email.`,
  });

  return NextResponse.json({ ok: true });
}
