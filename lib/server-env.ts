// Server-side environment configuration
// These values are injected at build time from Amplify environment variables
export const serverEnv = {
  PICS_SES_USER: process.env.PICS_SES_USER || '',
  PICS_SES_PASS: process.env.PICS_SES_PASS || '',
  AWS_REGION: process.env.AWS_REGION || 'us-east-1',
} as const;

// Validate that critical env vars are present
if (!serverEnv.PICS_SES_USER || !serverEnv.PICS_SES_PASS) {
  console.error('CRITICAL: Missing SES credentials in server-env.ts');
  console.error('PICS_SES_USER:', serverEnv.PICS_SES_USER ? 'SET' : 'MISSING');
  console.error('PICS_SES_PASS:', serverEnv.PICS_SES_PASS ? 'SET' : 'MISSING');
}
