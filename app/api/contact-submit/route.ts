export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { serverEnv } from "@/lib/server-env";

type Body = { name: string; email: string; message: string };

export async function POST(req: Request) {
  try {
    const region = serverEnv.AWS_REGION;
    const from = "gellerd@rider.edu";
    const to = "danielsgeller@gmail.com";

    const json = (await req.json()) as Partial<Body>;
    const name = (json.name || "").toString().trim();
    const email = (json.email || "").toString().trim();
    const message = (json.message || "").toString().trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing name/email/message" }, { status: 400 });
    }

    const accessKeyId = serverEnv.PICS_SES_USER;
    const secretAccessKey = serverEnv.PICS_SES_PASS;

    if (!accessKeyId || !secretAccessKey) {
      console.error("SES credentials missing from serverEnv");
      return NextResponse.json(
        {
          ok: false,
          error: "Missing SES credentials",
          debug: {
            hasUser: !!accessKeyId,
            hasPass: !!secretAccessKey,
            userLength: accessKeyId?.length || 0,
            passLength: secretAccessKey?.length || 0
          }
        },
        { status: 500 }
      );
    }

    const client = new SESClient({
      region,
      credentials: { accessKeyId, secretAccessKey },
    });

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
