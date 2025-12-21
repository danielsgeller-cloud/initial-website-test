import { NextResponse } from "next/server";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

export const runtime = "nodejs";

type Body = { name?: string; email?: string; message?: string };

export async function POST(req: Request) {
  try {
    // READ BODY EXACTLY ONCE
    const json = (await req.json()) as Body;
    const name = (json.name ?? "").toString();
    const email = (json.email ?? "").toString();
    const message = (json.message ?? "").toString();

    const region =
      process.env.NEXT_PUBLIC_SES_REGION ||
      process.env.AWS_REGION ||
      process.env.AWS_DEFAULT_REGION ||
      "us-east-1";

    const accessKeyId = process.env.PICS_SES_USER || "";
    const secretAccessKey = process.env.PICS_SES_PASS || "";
    const from = process.env.CONTACT_FROM || "";
    const to = process.env.CONTACT_TO || "";

    const envKeys = Object.keys(process.env || {}).filter((k) =>
      k.includes("PICS") || k.includes("CONTACT_") || k.startsWith("AWS_") || k.includes("NEXT_PUBLIC_SES")
    ).sort();

const debug = {
      region,
      hasUser: !!accessKeyId,
      hasPass: !!secretAccessKey,
      from: !!from,
      to: !!to,
      envKeys,
    };

    if (!debug.hasUser || !debug.hasPass || !debug.from || !debug.to) {
      return NextResponse.json(
        { ok: false, error: "Server email configuration error", debug },
        { status: 500 }
      );
    }

    const client = new SESv2Client({
      region,
      credentials: { accessKeyId, secretAccessKey },
    });

    const command = new SendEmailCommand({
      FromEmailAddress: from,
      Destination: { ToAddresses: [to] },
      Content: {
        Simple: {
          Subject: { Data: "Website Contact Form Submission" },
          Body: {
            Text: {
              Data: `Name: ${name}\nEmail: ${email}\n\n${message}`,
            },
          },
        },
      },
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
