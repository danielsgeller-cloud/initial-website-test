# Paused Issues & TODO

This file tracks issues that are paused or need attention later.

---

## ✅ RESOLVED: Image Upload on Order Form

**Status:** Resolved - implemented direct base64 storage
**Date Started:** 2026-01-17
**Date Resolved:** 2026-01-23
**Issue:** UploadThing image upload not working - requires API key configuration

**Resolution:**
- Removed UploadThing dependency completely (no third-party service needed)
- Implemented direct image upload with base64 encoding
- Images are now stored directly in the database with order data
- Image size limited to 2MB per image to keep database efficient
- Images display in both user order history and admin views

**Technical Changes Made:**
- ✅ Removed `@uploadthing/react` and `uploadthing` packages from package.json
- ✅ Removed `/app/api/uploadthing/` API route
- ✅ Removed `/lib/uploadthing.ts` helper file
- ✅ Updated order form to convert images to base64 on client side
- ✅ Updated account orders page to display uploaded images
- ✅ Updated admin page Order interface to include imageUrls
- ✅ Existing database schema already supported image storage (imageUrls field)

**Benefits:**
- No external service signup or API keys needed
- Images stored with order data (no orphaned files)
- Simple, self-contained solution
- No monthly fees or usage limits

---

## ✅ RESOLVED: Email Service Configuration

**Status:** Resolved - AWS Amplify environment variables confirmed configured
**Date Started:** 2026-01-17
**Date Resolved:** 2026-01-17
**Issue:** Getting error "Email service not configured" on production

**Resolution:**
- AWS Amplify environment variables were already correctly configured:
  - GMAIL_USER: danielsgeller@gmail.com
  - GMAIL_APP_PASSWORD: trgtjbtrclkgjkqi
- Updated local .env file to match production environment
- Email service should now work correctly on both dev and production

**Configured Environment Variables (synced between local and AWS Amplify):**
- ✅ Database: DATABASE_URL
- ✅ Auth: NEXTAUTH_URL, NEXTAUTH_SECRET
- ✅ Email: GMAIL_USER, GMAIL_APP_PASSWORD
- ✅ Contact: CONTACT_FROM, CONTACT_TO, ADMIN_EMAIL
- ✅ Stripe: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- ✅ Site: NEXT_PUBLIC_SITE_URL

**Test Next:**
- [ ] Test user registration email
- [ ] Test password reset email
- [ ] Test contact form submission

---

_Last Updated: 2026-01-17_
