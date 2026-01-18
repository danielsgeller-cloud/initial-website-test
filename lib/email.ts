import nodemailer from "nodemailer";

type SendEmailOptions = {
  to: string | string[]; // Support single email or array of emails
  subject: string;
  text: string;
  html?: string; // Optional HTML version
  from?: string;
  replyTo?: string;
};

export async function sendEmail(opts: SendEmailOptions) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    console.error("CRITICAL: Missing GMAIL_USER or GMAIL_APP_PASSWORD");
    throw new Error("Email service not configured");
  }

  // Create transporter using Gmail SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  // Send email
  await transporter.sendMail({
    from: opts.from || gmailUser,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
    replyTo: opts.replyTo,
  });
}
