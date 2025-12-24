/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverSourceMaps: true
  },
  // Inject build-time env vars into runtime
  env: {
    PICS_SES_USER: process.env.PICS_SES_USER || '',
    PICS_SES_PASS: process.env.PICS_SES_PASS || '',
    AWS_REGION: process.env.AWS_REGION || 'us-east-1',
  },
  // Also try serverComponentsExternalPackages for AWS SDK
  serverComponentsExternalPackages: ['@aws-sdk/client-ses'],
};

export default nextConfig;