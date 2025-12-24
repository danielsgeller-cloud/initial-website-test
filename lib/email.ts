import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { serverEnv } from "./server-env";

type SendEmailOptions = {
  to: string;
  subject: string;
  text: string;
  from?: string;
  replyTo?: string;
};

export async function sendEmail(opts: SendEmailOptions) {
  const region = serverEnv.AWS_REGION;
  const from = opts.from || process.env.CONTACT_FROM || process.env.SES_FROM_ADDRESS || "gellerd@rider.edu";

  const client = new SESClient({
    region,
    credentials: {
      accessKeyId: serverEnv.PICS_SES_USER,
      secretAccessKey: serverEnv.PICS_SES_PASS,
    },
  });

  const command = new SendEmailCommand({
    Source: from,
    Destination: { ToAddresses: [opts.to] },
    ReplyToAddresses: opts.replyTo ? [opts.replyTo] : undefined,
    Message: {
      Subject: { Data: opts.subject, Charset: "UTF-8" },
      Body: { Text: { Data: opts.text, Charset: "UTF-8" } },
    },
  });

  await client.send(command);
}
