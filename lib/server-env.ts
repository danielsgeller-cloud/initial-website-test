// Server-side environment configuration
// These values are written to runtime-config.json during the Amplify build
import runtimeConfig from './runtime-config.json';

export const serverEnv = {
  PICS_SES_USER: runtimeConfig.PICS_SES_USER || '',
  PICS_SES_PASS: runtimeConfig.PICS_SES_PASS || '',
  AWS_REGION: runtimeConfig.AWS_REGION || 'us-east-1',
} as const;

// Validate that critical env vars are present
if (!serverEnv.PICS_SES_USER || !serverEnv.PICS_SES_PASS) {
  console.error('CRITICAL: Missing SES credentials in server-env.ts');
  console.error('PICS_SES_USER:', serverEnv.PICS_SES_USER ? 'SET' : 'MISSING');
  console.error('PICS_SES_PASS:', serverEnv.PICS_SES_PASS ? 'SET' : 'MISSING');
  console.error('Config loaded:', runtimeConfig);
}
