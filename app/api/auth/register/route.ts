export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";
import { sha256 } from "@/lib/auth";

export async function POST(req: Request) {
    if (req.headers.get("x-pic-envcheck") === "1") {
      return NextResponse.json({
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        amplifyDeploymentId: process.env.AWS_AMPLIFY_DEPLOYMENT_ID || null,
        nodeEnv: process.env.NODE_ENV || null
      }, { status: 200 });
    }

  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const email = String(body.email || "").toLowerCase().trim();
    const password = String(body.password || "");
    const name = body.name ? String(body.name).trim() : null;
    const phone = body.phone ? String(body.phone).trim() : null;

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
      update: { passwordHash, name: name ?? undefined, phone: phone ?? undefined, verifyTokenHash, verifyTokenExpires },
      create: { email, passwordHash, name: name ?? undefined, phone: phone ?? undefined, verifyTokenHash, verifyTokenExpires },
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXTAUTH_URL ||
      "http://localhost:3000";

    const verifyUrl = `${baseUrl}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

    try {
      await sendEmail({
        to: email,
        subject: "Confirm your Pictures in Ceramic account",
        text:
          `Click to confirm your email:\n\n${verifyUrl}\n\n` +
          `This link expires in 1 hour.\n\nIf you did not request this, ignore this email.`,
      });
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      // User is created but email failed - return error so they know
      return NextResponse.json({
        error: "Account created but failed to send verification email. Please contact support."
      }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json({
      error: error?.message || "An unexpected error occurred during registration"
    }, { status: 500 });
  }
}
