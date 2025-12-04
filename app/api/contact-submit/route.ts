import { NextResponse } from "next/server";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

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
  try {
    const body = await getBody(req);
    console.log("Contact body:", body);

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Region still from NEXT_PUBLIC_SES_REGION
    const region = process.env.NEXT_PUBLIC_SES_REGION || "us-east-1";

    // Use very neutral names, no KEY / SECRET
    const accessKeyId = process.env.PICS_SES_USER;
    const secretAccessKey = process.env.PICS_SES_PASS;

    // Your preferred from/to addresses
    const fromAddress =
      process.env.SES_FROM_ADDRESS || "danielsgeller@gmail.com";
    const toAddress =
      process.env.SES_TO_ADDRESS || "gellerd@rider.edu";

console.log("SES env check", {
  region,
  hasUser: !!process.env.PICS_SES_USER,
  hasPass: !!process.env.PICS_SES_PASS,
  fromDefined: !!fromAddress,
  toDefined: !!toAddress,
});

    // Debug missing credentials
    if (!accessKeyId || !secretAccessKey) {
      console.error("Missing SES credentials in env", {
        region,
        hasAccessKey: !!accessKeyId,
        hasSecret: !!secretAccessKey,
      });

      return NextResponse.json(
        {
          ok: false,
          error: "Server email configuration error",
          details: {
            region,
            hasAccessKey: !!accessKeyId,
            hasSecret: !!secretAccessKey,
          },
        },
        { status: 500 }
      );
    }

    const client = new SESv2Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const command = new SendEmailCommand({
      FromEmailAddress: fromAddress,
      Destination: {
        ToAddresses: [toAddress],
      },
      ReplyToAddresses: [body.email],
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

    const sesResponse = await client.send(command);
    console.log("SES send result:", sesResponse);

    const httpStatus = sesResponse.$metadata?.httpStatusCode ?? 0;
    const messageId = (sesResponse as any).MessageId;

    if (httpStatus !== 200 || !messageId) {
      console.error("SES did not return success", httpStatus, messageId);
      return NextResponse.json(
        {
          ok: false,
          error: "SES did not accept the email",
          httpStatus,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      messageId,
    });
  } catch (error: any) {
    console.error("SES Error", error);
    return NextResponse.json(
      { ok: false, error: error?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
