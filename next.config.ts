import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwind-generator.b-cdn.net",
      },
    ],
  },
};

export default nextConfig;