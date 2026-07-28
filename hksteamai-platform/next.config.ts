import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prisma client is generated under src/; keep eslint from blocking builds on it.
  eslint: {
    dirs: ["src/app", "src/components", "src/lib"],
  },
};

export default nextConfig;
