/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverSourceMaps: true
  }
};

export default nextConfig;