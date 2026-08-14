import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/qashu",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
