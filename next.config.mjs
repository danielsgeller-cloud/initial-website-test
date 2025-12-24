/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverSourceMaps: true
  },
  env: {
    PICS_SES_USER: process.env.PICS_SES_USER,
    PICS_SES_PASS: process.env.PICS_SES_PASS,
    AWS_REGION: process.env.AWS_REGION,
  }
};

export default nextConfig;