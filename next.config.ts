import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  basePath: "/list",
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
