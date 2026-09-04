import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
      },
    ],
  },
};
export default nextConfig;
