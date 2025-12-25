/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverSourceMaps: true
  },
  // Explicitly ensure DATABASE_URL is available at runtime
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Make sure DATABASE_URL is available in server runtime
      config.externals = config.externals || [];
    }
    return config;
  },
};

export default nextConfig;