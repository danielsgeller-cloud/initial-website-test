export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

type Body = { name: string; email: string; message: string };

export async function POST(req: Request) {
  try {
    const from = process.env.CONTACT_FROM || "gellerd@rider.edu";
    const to = process.env.CONTACT_TO || "danielsgeller@gmail.com";

    const json = (await req.json()) as Partial<Body>;
    const name = (json.name || "").toString().trim();
    const email = (json.email || "").toString().trim();
    const message = (json.message || "").toString().trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing name/email/message" }, { status: 400 });
    }

    const subject = `Website contact: ${name}`;
    const text =
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}\n`;

    await sendEmail({
      to,
      from,
      replyTo: email,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
