import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  experimental: {
    optimizePackageImports: ["@chakra-ui/react"], 
  },
};

export default nextConfig;
