import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = (body?.email ?? "").toLowerCase().trim();
  const password = body?.password ?? "";
  const name = (body?.name ?? "").trim();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const token = crypto.randomBytes(32).toString("hex");
  const verifyTokenHash = sha256(token);
  const verifyTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.user.create({
    data: {
      email,
      name: name || null,
      passwordHash,
      emailVerified: null,
      verifyTokenHash,
      verifyTokenExpires,
    },
  });

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000"\;

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
