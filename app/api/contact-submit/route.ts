export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { contactConfirmationHTML } from "@/lib/email-templates";

type Body = { name: string; email: string; message: string };

export async function POST(req: Request) {
  try {
    const json = (await req.json()) as Partial<Body>;
    const name = (json.name || "").toString().trim();
    const email = (json.email || "").toString().trim();
    const message = (json.message || "").toString().trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing name/email/message" }, { status: 400 });
    }

        // Admin notification email
    const adminEmail = process.env.ADMIN_EMAIL || "danielsgeller@gmail.com";
    const adminEmailCc = process.env.ADMIN_EMAIL_CC;

    const adminRecipients = adminEmailCc
      ? [adminEmail, adminEmailCc]
      : adminEmail;


    const adminSubject = `Website contact: ${name}`;
    const adminText =
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}\n`;

    console.log("ENV CHECK IN ROUTE", {
      GMAIL_USER: process.env.GMAIL_USER,
      GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
    });


    // Send to admin(s)
    await sendEmail({
      to: adminRecipients,
      subject: adminSubject,
      text: adminText,
      replyTo: email,
    });

    // Customer confirmation email
    const customerSubject = "Thank you for contacting Pictures in Ceramic";
    const customerText = `
Hi ${name},

Thank you for reaching out to Pictures in Ceramic!

We have received your message and will get back to you as soon as possible, typically within 1-2 business days.

Your message:
${message}

If you have any urgent questions, please feel free to call us directly.

Best regards,
Pictures in Ceramic Team
    `.trim();

    // Send confirmation to customer
    let customerEmailFailed = false;
    try {
      await sendEmail({
        to: email,
        subject: customerSubject,
        text: customerText,
        html: contactConfirmationHTML(name, message),
      });
    } catch (emailError) {
      console.error("Failed to send customer confirmation:", emailError);
      customerEmailFailed = true;
    }

    return NextResponse.json({
      ok: true,
      warning: customerEmailFailed ? "Your message was received but confirmation email may have failed. We will still respond to your inquiry." : undefined
    });
  } catch (err: any) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
