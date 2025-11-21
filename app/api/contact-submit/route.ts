import { NextResponse } from "next/server";
import {
  SESv2Client,
  SendEmailCommand,
} from "@aws-sdk/client-sesv2";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = new SESv2Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AKIAZAJTF2YG77ISFY36 || "",
        secretAccessKey: process.env.JhpTUAW7UqhhXjzFJKtbhpdVyNAPQp6ykI2i4FI8 || "",
      },
    });

    const command = new SendEmailCommand({
      FromEmailAddress: process.env.SES_FROM_ADDRESS,
      Destination: {
        ToAddresses: [process.env.SES_TO_ADDRESS || ""],
      },
      Content: {
        Simple: {
          Subject: { Data: "New Order Form Submission" },
          Body: {
            Text: {
              Data:
                `Name: ${body.name}\n` +
                `Email: ${body.email}\n` +
                `Message: ${body.message}\n`,
            },
          },
        },
      },
    });

    await client.send(command);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("SES Error", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
