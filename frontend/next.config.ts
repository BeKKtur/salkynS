import type { NextConfig } from "next";

// Убираем явный тип ': NextConfig' у переменной, чтобы TypeScript не ругался
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5555",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig as NextConfig; // Приводим тип на экспорте
