# Paused Issues & TODO

This file tracks issues that are paused or need attention later.

---

## 🟡 PAUSED: Image Upload on Order Form

**Status:** Paused - needs configuration decision
**Date Paused:** 2026-01-17
**Issue:** UploadThing image upload not working - requires API key configuration

**Context:**
- Order form has image upload functionality using UploadThing service
- UploadThing requires `UPLOADTHING_SECRET` environment variable
- Need to decide on upload solution

**Options to Resume:**
1. **Option A**: Configure UploadThing
   - Sign up at https://uploadthing.com
   - Get API key
   - Add `UPLOADTHING_SECRET` to environment variables

2. **Option B**: Switch to AWS S3/Cloudflare R2
   - Implement direct cloud storage upload
   - More control, potentially lower cost

3. **Option C**: Remove feature temporarily
   - Have users email photos separately
   - Simpler short-term solution

**Next Steps When Resuming:**
- [ ] Decide on Option A, B, or C
- [ ] Follow implementation steps for chosen option
- [ ] Test image upload functionality

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
