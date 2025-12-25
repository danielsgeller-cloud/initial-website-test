export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { sha256, generateToken } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = String(body.email || "").toLowerCase().trim();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  // Rate limiting: 3 attempts per email per hour
  const rateLimitKey = `forgot-password:${email}`;
  if (!checkRateLimit(rateLimitKey, 3, 60 * 60 * 1000)) {
    return NextResponse.json({
      error: "Too many reset attempts. Please try again later."
    }, { status: 429 });
  }

  // Look up user
  const user = await prisma.user.findUnique({ where: { email } });

  // Always return success to prevent email enumeration
  // But only send email if user exists and is verified
  if (user && user.emailVerified) {
    const token = generateToken();
    const resetTokenHash = sha256(token);
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
      where: { email },
      data: { resetTokenHash, resetTokenExpires },
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXTAUTH_URL ||
      "http://localhost:3000";

    const resetUrl = `${baseUrl}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    try {
      await sendEmail({
        to: email,
        subject: "Reset your Pictures in Ceramic password",
        text:
          `Click to reset your password:\n\n${resetUrl}\n\n` +
          `This link expires in 1 hour.\n\n` +
          `If you did not request this, ignore this email. Your password will not change.`,
      });
    } catch (emailError) {
      console.error("Failed to send password reset email:", emailError);
      // Don't reveal if email exists, but log the error
    }
  }

  return NextResponse.json({
    ok: true,
    message: "If that email exists, we sent a reset link"
  });
}
