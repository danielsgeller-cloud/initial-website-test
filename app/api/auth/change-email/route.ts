import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/lib/email";
import { sha256, generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const newEmail = String(body.newEmail || "").toLowerCase().trim();
  const password = String(body.password || "");

  if (!newEmail || !password) {
    return NextResponse.json({
      error: "New email and password required"
    }, { status: 400 });
  }

  // Get current user
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Verify password
  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    return NextResponse.json({
      error: "Password is incorrect"
    }, { status: 400 });
  }

  // Check if new email is same as current
  if (newEmail === user.email) {
    return NextResponse.json({
      error: "New email must be different from current email"
    }, { status: 400 });
  }

  // Check if new email is already in use
  const existingUser = await prisma.user.findUnique({
    where: { email: newEmail },
  });

  if (existingUser) {
    return NextResponse.json({
      error: "Email already in use"
    }, { status: 400 });
  }

  // Generate token and hash
  const token = generateToken();
  const pendingEmailTokenHash = sha256(token);
  const pendingEmailExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  // Update user with pending email
  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      pendingEmail: newEmail,
      pendingEmailTokenHash,
      pendingEmailExpires,
    },
  });

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000";

  const confirmUrl = `${baseUrl}/confirm-email-change?token=${token}&userId=${user.id}`;

  // Send verification email to NEW address
  try {
    await sendEmail({
      to: newEmail,
      subject: "Confirm your new email address",
      text:
        `Click to confirm your new email address:\n\n${confirmUrl}\n\n` +
        `This link expires in 1 hour.\n\n` +
        `If you did not request this change, ignore this email.`,
    });
  } catch (emailError) {
    console.error("Failed to send email change verification:", emailError);
    return NextResponse.json({
      error: "Failed to send verification email. Please try again later."
    }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    message: "Verification email sent to new address"
  });
}
