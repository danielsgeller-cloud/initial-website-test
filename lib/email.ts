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
  const adminEmail = process.env.ADMIN_EMAIL; // info@picturesinceramic.com

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

  // Always include copies to picturesinceramic@gmail.com and info@picturesinceramic.com
  const originalRecipients = Array.isArray(opts.to) ? opts.to : [opts.to];
  const allRecipients = [...originalRecipients];

  // Add picturesinceramic@gmail.com if not already in the list
  if (!allRecipients.includes(gmailUser)) {
    allRecipients.push(gmailUser);
  }

  // Add info@picturesinceramic.com if not already in the list
  if (adminEmail && !allRecipients.includes(adminEmail)) {
    allRecipients.push(adminEmail);
  }

  // Send email
  await transporter.sendMail({
    from: opts.from || gmailUser,
    to: allRecipients,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
    replyTo: opts.replyTo,
  });
}
