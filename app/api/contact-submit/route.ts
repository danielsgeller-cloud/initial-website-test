export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

type Body = { name: string; email: string; message: string };

function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : undefined;
}

export async function POST(req: Request) {
  // DEBUG: show env visibility in deployed runtime
  const envKeys = Object.keys(process.env || {}).filter(k =>
    k.includes("CONTACT_") || k.includes("PICS") || k.includes("SES") || k.startsWith("AWS_")
  ).sort();

  return NextResponse.json({
    ok: false,
    error: "DEBUG_ENV",
    debug: {
      CONTACT_FROM: process.env.CONTACT_FROM ?? null,
      CONTACT_TO: process.env.CONTACT_TO ?? null,
      CONTACT_FROM: process.env.CONTACT_FROM ?? null,
      envKeys
    }
  }, { status: 500 });


  try {
    const region = env("AWS_REGION") || env("AWS_DEFAULT_REGION") || "us-east-1";
    const from = env("CONTACT_FROM");
    const to = env("CONTACT_TO");

    if (!from || !to) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing CONTACT_FROM or CONTACT_TO in Amplify env vars",
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
      return NextResponse.json(
        { ok: false, error: "Missing name/email/message" },
        { status: 400 }
      );
    }

    const client = new SESClient({ region });

    const subject = `Website contact: ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`;

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
