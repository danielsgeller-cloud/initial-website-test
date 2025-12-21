import { NextResponse } from "next/server";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = { name: string; email: string; message: string };

async function getBody(req: Request): Promise<Body> {
  try {
    const envKeys = Object.keys(process.env || {}).filter((k) =>
      k.includes("PICS") || k.includes("SES_") || k.startsWith("AWS_") || k.includes("NEXT_PUBLIC_SES")
    ).sort();
    console.log("ENV KEYS (filtered):", envKeys);
    const json = await req.json();
    return { name: json.name ?? "", email: json.email ?? "", message: json.message ?? "" };
  } catch {
    const form = await req.formData();
    return {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      message: String(form.get("message") ?? ""),
    };
  }
}

export async function POST(req: Request) {
  try {
    const body = await getBody(req);

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const region = "us-east-1";

    // TEMP hardcode so env vars do not matter at all.
    const fromAddress = "danielsgeller@gmail.com";
    const toAddress = "gellerd@rider.edu";

    // IMPORTANT: do NOT pass credentials here.
    // This forces AWS SDK to use the Amplify compute role (IAM role) automatically.
    const client = new SESv2Client({ region });

    const command = new SendEmailCommand({
      FromEmailAddress: fromAddress,
      Destination: { ToAddresses: [toAddress] },
      ReplyToAddresses: [body.email],
      Content: {
        Simple: {
          Subject: { Data: "Website Contact Form Submission" },
          Body: { Text: { Data: `Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}` } },
        },
      },
    });

    const res = await client.send(command);
    const httpStatus = res.$metadata?.httpStatusCode ?? 0;

    if (httpStatus !== 200 || !res.MessageId) {
      return NextResponse.json({ ok: false, error: "SES did not accept the email", httpStatus }, { status: 502 });
    }

    return NextResponse.json({ ok: true, messageId: res.MessageId });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
