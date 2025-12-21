import { NextResponse } from "next/server";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

export const runtime = "nodejs";

type Body = {
  name: string;
  email: string;
  message: string;
};

function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim().length ? v.trim() : undefined;
}

async function getBody(req: Request): Promise<Body> {
  const json = (await req.json()) as Partial<Body>;
  return {
    name: (json.name ?? "").toString(),
    email: (json.email ?? "").toString(),
    message: (json.message ?? "").toString(),
  };
}

// Amplify Hosting SSR provides short-lived creds via a local "credential listener".
// Your envKeys prove these vars exist in runtime.
async function getAmplifyCreds(): Promise<
  | { accessKeyId: string; secretAccessKey: string; sessionToken?: string }
  | null
> {
  const enabled = env("AWS_AMPLIFY_CREDENTIAL_LISTENER_ENABLED");
  const host = env("AWS_AMPLIFY_CREDENTIAL_LISTENER_HOST");
  const port = env("AWS_AMPLIFY_CREDENTIAL_LISTENER_PORT");
  const path = env("AWS_AMPLIFY_CREDENTIAL_LISTENER_PATH");
  const timeoutMs = Number(env("AWS_AMPLIFY_CREDENTIAL_LISTENER_TIMEOUT") ?? "2000");

  if (!enabled || enabled.toLowerCase() !== "true") return null;
  if (!host || !port || !path) return null;

  const url = `http://${host}:${port}${path}`;

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const r = await fetch(url, { signal: controller.signal });
    if (!r.ok) return null;

    const data: any = await r.json();

    const accessKeyId = data?.AccessKeyId || data?.accessKeyId;
    const secretAccessKey = data?.SecretAccessKey || data?.secretAccessKey;
    const sessionToken = data?.Token || data?.SessionToken || data?.sessionToken;

    if (!accessKeyId || !secretAccessKey) return null;

    return {
      accessKeyId: String(accessKeyId),
      secretAccessKey: String(secretAccessKey),
      sessionToken: sessionToken ? String(sessionToken) : undefined,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

export async function POST(req: Request) {
  try {
    const region = env("AWS_REGION") || env("AWS_DEFAULT_REGION") || "us-east-1";

    // TEMP hardcode until you add Amplify env vars CONTACT_FROM/CONTACT_TO
    // Replace these two strings with what you want.
    const from = "no-reply@picturesinceramic.com";
    const to = "gellerd@rider.edu";

    const body = await getBody(req);

    const creds = await getAmplifyCreds();

    const client = new SESv2Client({
      region,
      credentials: creds ?? undefined,
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
      ReplyToAddresses: body.email ? [body.email] : undefined,
    });

    const res = await client.send(command);

    return NextResponse.json({
      ok: true,
      messageId: res.MessageId,
      debug: {
        region,
        usedAmplifyCreds: !!creds,
        listenerEnabled: env("AWS_AMPLIFY_CREDENTIAL_LISTENER_ENABLED") === "true",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: err?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
