import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  turbopack: {
    // Explicitly set root to prevent Turbopack from picking up the parent
    // directory when this project lives inside a git worktree
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
