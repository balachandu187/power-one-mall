import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Disable linting/TS checks during build if there are minor issues we want to bypass,
  // but let's keep it strict and see if it passes. We want it production-ready.
};

export default nextConfig;
