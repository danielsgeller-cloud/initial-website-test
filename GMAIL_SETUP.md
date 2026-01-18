# Gmail SMTP Setup Guide

Your website now uses **Gmail SMTP with Nodemailer** to send emails. This is free, reliable, and sends from your actual Gmail account.

## What You Get

**For Order Submissions:**
- ✅ Customer receives order confirmation email
- ✅ You receive order notification at ADMIN_EMAIL
- ✅ Optional third email receives notification (ADMIN_EMAIL_CC)
- ✅ All sent emails appear in your Gmail "Sent" folder

**For Contact Form:**
- ✅ Customer receives "Thank you" confirmation email
- ✅ You receive the contact message at ADMIN_EMAIL
- ✅ Optional third email receives notification (ADMIN_EMAIL_CC)
- ✅ Reply-To is set to customer's email for easy response

---

## Step 1: Enable 2-Factor Authentication on Gmail

Gmail requires 2-factor authentication before you can create App Passwords.

1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** in the left sidebar
3. Under "How you sign in to Google," click **2-Step Verification**
4. Follow the prompts to turn it on (you'll need your phone)

---

## Step 2: Create a Gmail App Password

Once 2-factor authentication is enabled:

1. Go to: https://myaccount.google.com/apppasswords
   - Or: Google Account → Security → 2-Step Verification → App passwords (at bottom)

2. You may be asked to sign in again

3. Under "Select app," choose **Mail**

4. Under "Select device," choose **Other (Custom name)**
   - Type: `Pictures in Ceramic Website`

5. Click **Generate**

6. Google will show you a **16-character password** like: `abcd efgh ijkl mnop`

7. **IMPORTANT:** Copy this password immediately - you can't see it again!

---

## Step 3: Update Your .env File

Add these variables to your `.env` file (NOT `.env.example`):

```bash
# Gmail SMTP Configuration
GMAIL_USER="your-actual-email@gmail.com"
GMAIL_APP_PASSWORD="abcdefghijklmnop"  # Remove spaces from the 16-char password

# Email Recipients
ADMIN_EMAIL="your-actual-email@gmail.com"  # Your main email
ADMIN_EMAIL_CC="partner@example.com"  # Optional: third email for notifications
```

**Important Notes:**
- `GMAIL_USER` = Your full Gmail address (e.g., `daniel@gmail.com`)
- `GMAIL_APP_PASSWORD` = The 16-character password from Step 2 (remove spaces)
- `ADMIN_EMAIL` = Where you want to receive order/contact notifications
- `ADMIN_EMAIL_CC` = Optional third email (leave blank if you don't need it)

---

## Step 4: Remove Old Resend Configuration

Delete these old variables from your `.env` file:

```bash
RESEND_API_KEY  # Not needed anymore
CONTACT_FROM    # Not needed anymore
CONTACT_TO      # Not needed anymore
```

---

## Step 5: Test It

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Submit a test order or contact form

3. Check your Gmail:
   - You should receive the notification
   - The email should appear in your "Sent" folder
   - Customer should receive confirmation

---

## Gmail Sending Limits

**Free Gmail Account:**
- 500 emails per day
- More than enough for most small businesses

**Google Workspace (Paid):**
- 2,000 emails per day
- $6-12/month per user
- Professional email address (e.g., orders@picturesinceramic.com)

---

## Troubleshooting

### "Invalid login" error
- Make sure 2-factor authentication is enabled
- Make sure you're using the App Password, not your regular Gmail password
- Remove any spaces from the App Password

### Emails not sending
- Check your `.env` file has the correct email and password
- Make sure you've restarted your dev server after changing `.env`
- Check the server logs for error messages

### Emails going to spam
- This is normal for the first few emails
- Ask recipients to mark as "Not Spam"
- Consider upgrading to Google Workspace for better deliverability

### Need a professional email address?
- Consider Google Workspace to get `orders@picturesinceramic.com`
- Or use a custom domain with Gmail ($6-12/month)

---

## Security Notes

- Never commit your `.env` file to Git (it's already in `.gitignore`)
- The App Password only works for this app, not for logging into Gmail
- You can revoke the App Password anytime from your Google Account settings
- If you suspect the password is compromised, revoke it and generate a new one

---

## What Changed from Resend?

**Before (Resend):**
- Required API key from third-party service
- Sent from generic address like "onboarding@resend.dev"
- Sent emails didn't appear in your Gmail

**Now (Gmail SMTP):**
- Uses your Gmail account directly
- Sends from your actual email address
- All sent emails appear in your Gmail "Sent" folder
- Free (or cheap with Google Workspace)
- More professional and trustworthy for customers

---

## Next Steps

1. Complete Steps 1-3 above to get your App Password
2. Update your `.env` file with the credentials
3. Test the contact form and order submission
4. Optionally add a third email to `ADMIN_EMAIL_CC`
5. Deploy to production and update environment variables in AWS Amplify

---

Need help? Check the Nodemailer docs: https://nodemailer.com/
