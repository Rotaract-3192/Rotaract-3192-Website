import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Image domains
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
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
