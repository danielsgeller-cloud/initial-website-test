export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

type Body = { name: string; email: string; message: string };

function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : undefined;
}

export async function POST(req: Request) {
  try {
    const region = env("AWS_REGION") || env("AWS_DEFAULT_REGION") || "us-east-1";
    const from = "gellerd@rider.edu";
    const to = "danielsgeller@gmail.com";

    if (!from || !to) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing CONTACT_FROM or CONTACT_TO in runtime env",
          debug: { region, from: !!from, to: !!to }
        },
        { status: 500 }
      );
    }

    const json = (await req.json()) as Partial<Body>;
    const name = (json.name || "").toString().trim();
    const email = (json.email || "").toString().trim();
    const message = (json.message || "").toString().trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing name/email/message" }, { status: 400 });
    }

    const client = new SESClient({ region });

    const subject = `Website contact: ${name}`;
    const text =
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}\n`;

    const command = new SendEmailCommand({
      Source: from,
      Destination: { ToAddresses: [to] },
      ReplyToAddresses: [email],
      Message: {
        Subject: { Data: subject, Charset: "UTF-8" },
        Body: { Text: { Data: text, Charset: "UTF-8" } }
      }
    });

    const res = await client.send(command);
    return NextResponse.json({ ok: true, messageId: res.MessageId });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
