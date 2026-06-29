import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',

  reactStrictMode: true,
  compress: true,

  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },

  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    '192.168.56.1',
  ],

  experimental: {},
};

export default nextConfig;