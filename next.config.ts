import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "webring.skule.ca",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;
