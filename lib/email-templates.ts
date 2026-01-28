// Email HTML templates with consistent styling

const baseStyles = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
`;

const containerStyles = `
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
`;

const headerStyles = `
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  padding: 30px 20px;
  text-align: center;
  border-radius: 8px 8px 0 0;
`;

const contentStyles = `
  padding: 30px 20px;
  background-color: #fafafa;
`;

const buttonStyles = `
  display: inline-block;
  padding: 12px 30px;
  background-color: #f59e0b;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  margin: 20px 0;
`;

const footerStyles = `
  padding: 20px;
  text-align: center;
  font-size: 12px;
  color: #666;
  border-top: 1px solid #ddd;
`;

export function createEmailTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pictures in Ceramic</title>
</head>
<body style="${baseStyles} margin: 0; padding: 20px; background-color: #f5f5f5;">
  <div style="${containerStyles}">
    <div style="${headerStyles}">
      <h1 style="margin: 0; font-size: 24px;">Pictures in Ceramic</h1>
    </div>
    <div style="${contentStyles}">
      ${content}
    </div>
    <div style="${footerStyles}">
      <p style="margin: 0;">Pictures in Ceramic LLC</p>
      <p style="margin: 5px 0 0 0;">Handcrafted Kiln-Fired Enamel Portraits</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export function verificationEmailHTML(verifyUrl: string): string {
  const content = `
    <h2 style="color: #333; margin-top: 0;">Confirm Your Email Address</h2>
    <p>Thank you for creating an account with Pictures in Ceramic!</p>
    <p>Please click the button below to verify your email address and activate your account:</p>
    <div style="text-align: center;">
      <a href="${verifyUrl}" style="${buttonStyles}">Verify Email Address</a>
    </div>
    <p style="color: #666; font-size: 14px;">This link will expire in 1 hour.</p>
    <p style="color: #666; font-size: 14px;">If you didn't create this account, please ignore this email.</p>
  `;
  return createEmailTemplate(content);
}

export function passwordResetEmailHTML(resetUrl: string): string {
  const content = `
    <h2 style="color: #333; margin-top: 0;">Reset Your Password</h2>
    <p>We received a request to reset your password for your Pictures in Ceramic account.</p>
    <p>Click the button below to choose a new password:</p>
    <div style="text-align: center;">
      <a href="${resetUrl}" style="${buttonStyles}">Reset Password</a>
    </div>
    <p style="color: #666; font-size: 14px;">This link will expire in 1 hour.</p>
    <p style="color: #666; font-size: 14px;">If you didn't request this, you can safely ignore this email. Your password will not change.</p>
  `;
  return createEmailTemplate(content);
}

export function emailChangeVerificationHTML(confirmUrl: string): string {
  const content = `
    <h2 style="color: #333; margin-top: 0;">Confirm Your New Email</h2>
    <p>You requested to change your email address for your Pictures in Ceramic account.</p>
    <p>Click the button below to confirm this change:</p>
    <div style="text-align: center;">
      <a href="${confirmUrl}" style="${buttonStyles}">Confirm Email Change</a>
    </div>
    <p style="color: #666; font-size: 14px;">This link will expire in 1 hour.</p>
    <p style="color: #666; font-size: 14px;">If you didn't request this change, please ignore this email.</p>
  `;
  return createEmailTemplate(content);
}

export function contactConfirmationHTML(name: string, message: string): string {
  const content = `
    <h2 style="color: #333; margin-top: 0;">Thank You for Contacting Us</h2>
    <p>Hi ${name},</p>
    <p>Thank you for reaching out to Pictures in Ceramic!</p>
    <p>We have received your message and will get back to you as soon as possible, typically within 1-2 business days.</p>
    <div style="background-color: #fff; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0;">
      <p style="margin: 0; font-weight: 600;">Your message:</p>
      <p style="margin: 10px 0 0 0;">${message}</p>
    </div>
    <p>If you have any urgent questions, please feel free to call us directly.</p>
    <p>Best regards,<br><strong>Pictures in Ceramic Team</strong></p>
  `;
  return createEmailTemplate(content);
}

export function orderConfirmationHTML(orderId: string, orderDetails: string): string {
  const content = `
    <h2 style="color: #333; margin-top: 0;">Order Confirmation</h2>
    <p>Thank you for your order with Pictures in Ceramic!</p>
    <div style="background-color: #fff; padding: 20px; border-radius: 6px; margin: 20px 0;">
      <p style="margin: 0 0 10px 0;"><strong>Order #${orderId}</strong></p>
      <p style="margin: 0; color: #666; font-size: 14px;">Date: ${new Date().toLocaleDateString()}</p>
    </div>
    <div style="background-color: #fff; padding: 20px; border-radius: 6px;">
      <pre style="margin: 0; white-space: pre-wrap; font-family: inherit;">${orderDetails}</pre>
    </div>
    <p style="margin-top: 20px;">We will contact you shortly to confirm your order and arrange for photo submission.</p>
    <p>Thank you for choosing Pictures in Ceramic!</p>
  `;
  return createEmailTemplate(content);
}
