import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "womopreneur.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
