# Admin Setup & Troubleshooting Guide

This guide explains how to set up admin access and troubleshoot common issues with account creation and authentication.

## Creating an Admin User

### Step 1: Register a Regular Account

1. Go to `/register` on your website
2. Fill out the registration form with the email you want to use for admin access
3. Submit the form
4. Check your email for the verification link
5. Click the verification link to verify your email

### Step 2: Promote the Account to Admin

Once your account is created and verified, you need to promote it to ADMIN role using the command line:

```bash
npx tsx scripts/make-admin.ts your-email@example.com
```

**Example:**
```bash
npx tsx scripts/make-admin.ts admin@example.com
```

This script will:
- Look up the user by email
- Check if they exist (if not, you'll get an error)
- Promote their role from "USER" to "ADMIN"
- Confirm the change

### Step 3: Access the Admin Panel

1. Go to `/admin` on your website
2. If you're not logged in, you'll be redirected to the login page
3. Sign in with your admin credentials
4. You should now see the admin dashboard

## Troubleshooting

### Issue: "User not found" when running make-admin script

**Solution:** Make sure you've registered the account first at `/register` and used the exact same email address.

### Issue: Can't log in after registering

**Possible causes:**
1. **Email not verified** - Check your inbox for the verification email and click the link
2. **Incorrect password** - Double-check that you're using the correct password
3. **Email typo** - Make sure you're using the exact email you registered with

**Check email verification status:**
You can check in the database if the email is verified by looking at the `emailVerified` field in the User table.

### Issue: "Access Denied" when visiting /admin

**Possible causes:**
1. **Not logged in** - Click "Sign in as admin" and log in
2. **Not an admin** - Your account hasn't been promoted to ADMIN role yet. Run the `make-admin.ts` script
3. **Session expired** - Sign out and sign in again

### Issue: Not receiving verification emails

**Check environment variables:**
Make sure your `.env` file has the correct Gmail SMTP settings:

```env
GMAIL_USER="your-gmail@gmail.com"
GMAIL_APP_PASSWORD="your-app-password"
```

**Note:**
- `GMAIL_APP_PASSWORD` is NOT your regular Gmail password
- You need to create an "App Password" in your Google account settings
- Go to: Google Account → Security → 2-Step Verification → App passwords

**Test email sending:**
Check your server logs for email errors. The registration endpoint will return an error if email sending fails.

### Issue: Login shows "Invalid email or password"

**Possible causes:**
1. **Email not verified** - You must verify your email before you can log in
2. **Wrong credentials** - Double-check email and password
3. **Account doesn't exist** - Register first at `/register`

**Fix:**
1. Check if you received the verification email
2. If not, check spam folder
3. If still no email, check server logs for email errors
4. Try registering again (the system allows re-registration if email isn't verified)

## Database Checks

If you have direct database access, you can verify:

### Check if user exists and is verified:
```sql
SELECT id, email, role, emailVerified, createdAt
FROM "User"
WHERE email = 'your-email@example.com';
```

### Check if user is admin:
```sql
SELECT email, role FROM "User" WHERE role = 'ADMIN';
```

### Manually set admin role (if needed):
```sql
UPDATE "User"
SET role = 'ADMIN'
WHERE email = 'your-email@example.com';
```

## Environment Variables Checklist

Make sure you have all required environment variables in your `.env` file:

- ✅ `DATABASE_URL` - PostgreSQL connection string
- ✅ `NEXTAUTH_URL` - Your site URL (e.g., http://localhost:3000 or https://yourdomain.com)
- ✅ `NEXTAUTH_SECRET` - Random secret for NextAuth (generate with `openssl rand -hex 32`)
- ✅ `GMAIL_USER` - Gmail address for sending emails
- ✅ `GMAIL_APP_PASSWORD` - Gmail app password (not regular password)

## Security Notes

### Admin Role Assignment
- Admin role should only be assigned to trusted users
- Never expose the admin promotion script in production
- Consider limiting admin access to specific IP addresses if needed

### Password Requirements
- Minimum 8 characters
- Passwords are hashed with bcrypt before storage
- Never share admin credentials

### Email Verification
- All users must verify their email before they can log in
- Verification tokens expire after 1 hour
- Users can re-register if their verification token expires

## Common Workflows

### Creating the First Admin
```bash
# 1. Register an account via the website
# 2. Verify email via the link sent to your inbox
# 3. Run the admin promotion script
npx tsx scripts/make-admin.ts admin@example.com

# 4. Log in at /admin
```

### Adding Additional Admins
```bash
# Same process - they must register first, then you promote them
npx tsx scripts/make-admin.ts newadmin@example.com
```

### Resetting an Admin Password
Use the "Forgot Password" link on the login page - it works for both regular users and admins.

## Support

If you continue to have issues:
1. Check the server logs for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure the database is accessible and migrations are run
4. Check that email service (Gmail) is configured correctly
