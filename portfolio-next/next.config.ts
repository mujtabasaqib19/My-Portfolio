import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],

    // REQUIRED for static export
    unoptimized: true,
  },
};

export default nextConfig;
