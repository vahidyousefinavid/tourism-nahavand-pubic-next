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
    // domains: ['images.pexels.com', 'babib.ir'],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // موجود است
      },
      {
        protocol: 'http',
        hostname: 'localhost', // اضافه کردن این خط برای localhost
        port: '4000', // اگر از پورت خاصی استفاده می‌کنید، این را نیز اضافه کنید
      },
      {
        protocol: 'http',
        hostname: 'localhost', // اضافه کردن این خط برای localhost
        port: '4000', // اگر از پورت خاصی استفاده می‌کنید، این را نیز اضافه کنید
      },
      {
        protocol: "http",
        hostname: "localhost:4000",
        pathname: "/Apiv2/**",
      },
      {
        protocol: "http",
        hostname: "localhost:4000",
      },
      {
        protocol: "https",
        hostname: "babib.ir",
        pathname: "/Apiv2/**",
      },
      {
        protocol: "https",
        hostname: "babib.ir",
      },
    ],
    // disableStaticImages: true,
  },
  typescript: {
    // اجازه می‌دهد حتی اگر TypeScript error باشد build انجام شود
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ رد کردن ESLint هنگام build
  },
  rewrites
};

export default nextConfig;
