import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@napi-rs/canvas', 'fluent-ffmpeg', 'ffmpeg-static'],
  experimental: {
    serverComponentsExternalPackages: ['@napi-rs/canvas']
  }
};

export default nextConfig;
