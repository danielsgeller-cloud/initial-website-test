import { NextResponse } from "next/server";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

export const runtime = "nodejs";

type Body = {
  name: string;
  email: string;
  message: string;
};

function envBool(v?: string) {
  return !!(v && String(v).trim().length > 0);
}

export async function POST(req: Request) {
  try {
    // Read body exactly once
    const json = (await req.json()) as Partial<Body>;
    const body: Body = {
      name: json?.name ?? "",
      email: json?.email ?? "",
      message: json?.message ?? "",
    };

    // Debug: what env vars exist in runtime (names only)
    const envKeys = Object.keys(process.env || {})
      .filter((k) => k.includes("PICS") || k.includes("SES_") || k.startsWith("AWS_") || k.includes("NEXT_PUBLIC_SES") || k.includes("CONTACT_"))
      .sort();
    console.log("ENV KEYS (filtered):", envKeys);

    const region = process.env.NEXT_PUBLIC_SES_REGION || "us-east-1";

    const accessKeyId = process.env.PICS_SES_USER || "";
    const secretAccessKey = process.env.PICS_SES_PASS || "";
    const from = process.env.CONTACT_FROM || "";
    const to = process.env.CONTACT_TO || "";

    const debug = {
      region,
      hasUser: envBool(accessKeyId),
      hasPass: envBool(secretAccessKey),
      from: envBool(from),
      to: envBool(to),
    };
    console.log("SES env check", debug);
    console.log("Contact body:", { name: body.name, email: body.email, message: body.message });

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
              Data: `Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`,
            },
          },
        },
      },
    });

    const res = await client.send(command);
    console.log("SES send result:", res);

    return NextResponse.json({ ok: true, messageId: res.MessageId });
  } catch (err: any) {
    console.error("SES Error", err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
