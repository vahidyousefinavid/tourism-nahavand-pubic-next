import type { NextConfig } from "next";

async function rewrites() {
  const DOMAIN = process.env.DOMAIN_API;
  return [
    {
      source: "/api/:path*",
      destination: DOMAIN + "/api/:path*",
    },
  ];
}
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.pexels.com'],
  },
  rewrites
};

export default nextConfig;
