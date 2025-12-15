import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

export async function sendEmail(opts: { to: string; subject: string; text: string }) {
  const region = process.env.SES_REGION || process.env.NEXT_PUBLIC_SES_REGION || "us-east-1";
  const from = process.env.SES_FROM_ADDRESS || "";
  if (!from) throw new Error("Missing SES_FROM_ADDRESS");

  const client = new SESv2Client({
    region,
    credentials: {
      accessKeyId: process.env.PICS_SES_USER || "",
      secretAccessKey: process.env.PICS_SES_PASS || "",
    },
  });

  await client.send(
    new SendEmailCommand({
      FromEmailAddress: from,
      Destination: { ToAddresses: [opts.to] },
      Content: {
        Simple: {
          Subject: { Data: opts.subject },
          Body: { Text: { Data: opts.text } },
        },
      },
    })
  );
}
