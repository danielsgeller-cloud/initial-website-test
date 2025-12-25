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

  const email = String(body.email || "").toLowerCase().trim();
  const token = String(body.token || "").trim();

  if (!email || !token) {
    return NextResponse.json({ error: "Missing email or token" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.verifyTokenHash || !user.verifyTokenExpires) {
    return NextResponse.json({ error: "Invalid link" }, { status: 400 });
  }

  if (user.verifyTokenExpires.getTime() < Date.now()) {
    return NextResponse.json({ error: "Link expired" }, { status: 400 });
  }

  if (sha256(token) !== user.verifyTokenHash) {
    return NextResponse.json({ error: "Invalid link" }, { status: 400 });
  }

  await prisma.user.update({
    where: { email },
    data: { emailVerified: new Date(), verifyTokenHash: null, verifyTokenExpires: null },
  });

  return NextResponse.json({ ok: true });
}
