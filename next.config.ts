import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Standalone output for Docker/DO App Platform deployment
  output: 'standalone',

  // Image domains
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  // Allow HMR from network hosts (for VM/docker development)
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    '192.168.56.1', // VM network interface
  ],
  experimental: {}
};

export default nextConfig;
