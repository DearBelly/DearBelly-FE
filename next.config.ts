import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 기타 config 옵션...
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;