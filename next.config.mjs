/** @type {import('next').NextConfig} */
const nextConfig = {
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

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dearbelly-s3-bucket.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
