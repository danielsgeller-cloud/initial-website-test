# Image Cleanup Guide

## Overview

Customer order images are stored directly in the database as base64-encoded data. Over time, this can cause the database to grow. This guide explains how to clean up old images to keep your database size manageable.

## Automatic Image Compression

As of the latest update, all uploaded images are automatically:
- **Compressed** using browser-side compression
- **Resized** to a maximum of 1920px (maintaining aspect ratio)
- **Converted to JPEG** format at 80% quality
- **Limited** to 10MB original file size

This means even large images (3-5MB) get compressed to around 200-500KB before being stored in the database.

## Manual Image Cleanup

To remove images from old orders and free up database space, you can use the cleanup API endpoint.

### Endpoint

```
POST /api/orders/cleanup-images
```

**Authentication:** Requires admin login

### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `daysOld` | 90 | Remove images from orders older than this many days |
| `dryRun` | false | If "true", shows what would be cleaned without actually deleting |

### Examples

#### 1. Preview what would be cleaned (Dry Run)

```bash
# Using curl (replace with your actual domain and admin session cookie)
curl -X POST "https://picturesinceramic.com/api/orders/cleanup-images?dryRun=true&daysOld=90" \
  -H "Cookie: your-session-cookie"
```

This will return:
```json
{
  "success": true,
  "dryRun": true,
  "message": "Would clean images from 15 orders (45 total images)",
  "ordersAffected": 15,
  "totalImages": 45,
  "cutoffDate": "2025-10-25T00:00:00.000Z",
  "orders": [...]
}
```

#### 2. Actually clean up old images

```bash
# Remove images from orders older than 90 days
curl -X POST "https://picturesinceramic.com/api/orders/cleanup-images?daysOld=90" \
  -H "Cookie: your-session-cookie"
```

#### 3. More aggressive cleanup (older than 30 days)

```bash
curl -X POST "https://picturesinceramic.com/api/orders/cleanup-images?daysOld=30" \
  -H "Cookie: your-session-cookie"
```

### Using the Browser

1. **Log in as admin** at https://picturesinceramic.com/login
2. **Open browser console** (F12 or right-click → Inspect → Console)
3. **Run this command** to see what would be cleaned:

```javascript
fetch('/api/orders/cleanup-images?dryRun=true&daysOld=90', { method: 'POST' })
  .then(r => r.json())
  .then(console.log)
```

4. **Run this command** to actually clean:

```javascript
fetch('/api/orders/cleanup-images?daysOld=90', { method: 'POST' })
  .then(r => r.json())
  .then(console.log)
```

## What Happens During Cleanup

- Images are **permanently removed** from order records
- Order information (customer name, email, pricing, etc.) is **kept intact**
- Only affects orders **older than the specified threshold**
- Cannot be undone - make sure to **run dry run first**

## Recommended Cleanup Schedule

- **Every 3 months**: Clean images from orders older than 90 days
- **Every 6 months**: Clean images from orders older than 60 days
- **Yearly**: Clean images from orders older than 30 days

## Important Notes

1. **Backup First**: Always backup your database before running cleanup
2. **Dry Run First**: Always run with `dryRun=true` to preview changes
3. **Admin Only**: This endpoint requires admin authentication
4. **No Undo**: Deleted images cannot be recovered

## Checking Database Size

To check your current database size in the Neon console:
1. Log into your Neon dashboard
2. Select your database
3. Check the "Storage" tab

If storage is growing too fast, consider:
- Running cleanup more frequently
- Reducing the `daysOld` threshold
- Further reducing image compression quality in the order form

## Alternative: Automatic Cleanup

You can set up a scheduled task (cron job) to run cleanup automatically:

**Example with cron (on your server or a service like EasyCron):**
```
# Run cleanup every week on Sunday at 2am
0 2 * * 0 curl -X POST "https://picturesinceramic.com/api/orders/cleanup-images?daysOld=90"
```

**Example with AWS Lambda:**
Create a Lambda function that calls the cleanup API on a schedule using EventBridge.
