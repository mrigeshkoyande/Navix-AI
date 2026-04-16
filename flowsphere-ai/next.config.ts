import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Required for Docker / Google Cloud Run deployment
  output: 'standalone',
  images: {
    formats: ['image/webp'],
    // Allow unoptimized images in containerized env if no CDN is configured
    unoptimized: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
