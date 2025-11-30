import { NextResponse } from "next/server";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = new SESv2Client({
      region: process.env.AWS_REGION || "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });

    const fromAddress = process.env.SES_FROM_ADDRESS || "info@picturesinceramic.com";
    const toAddress = process.env.SES_TO_ADDRESS || "info@picturesinceramic.com";

    const command = new SendEmailCommand({
      FromEmailAddress: fromAddress,
      Destination: {
        ToAddresses: [toAddress],
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
