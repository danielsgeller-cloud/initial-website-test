import { NextResponse } from "next/server";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

export const runtime = "nodejs";

type OrderBody = {
  name: string;
  email: string;
  message: string;
};

async function getBody(req: Request): Promise<OrderBody> {
  try {
    const json = await req.json();
    return {
      name: json.name ?? "",
      email: json.email ?? "",
      message: json.message ?? "",
    };
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
  const region = process.env.NEXT_PUBLIC_SES_REGION || "us-east-1";
  const accessKeyId = process.env.PICS_SES_USER;
  const secretAccessKey = process.env.PICS_SES_PASS;
  const fromAddress = process.env.SES_FROM_ADDRESS;
  const toAddress = process.env.SES_TO_ADDRESS;

  if (!accessKeyId || !secretAccessKey || !fromAddress || !toAddress) {
    return NextResponse.json({
      ok: false,
      error: "Server email configuration error",
      debug: {
        region,
        hasUser: !!accessKeyId,
        hasPass: !!secretAccessKey,
        from: !!fromAddress,
        to: !!toAddress,
      },
    }, { status: 500 });
  }

  const body = await getBody(req);

  const client = new SESv2Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });

  const command = new SendEmailCommand({
    FromEmailAddress: fromAddress,
    Destination: { ToAddresses: [toAddress] },
    ReplyToAddresses: [body.email],
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

  return NextResponse.json({
    ok: true,
    messageId: res.MessageId,
  });
}
