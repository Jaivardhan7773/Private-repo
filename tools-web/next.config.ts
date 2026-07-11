import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Turbopack config (Next.js 16 default bundler)
  turbopack: {
    // Set correct root to fix workspace root detection
    root: path.resolve(__dirname),
    // WASM support for pdf.js and other wasm modules
    rules: {
      "*.wasm": {
        loaders: [],
        as: "*.wasm",
      },
    },
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      // Cache static assets
      {
        source: "/(.*)\\.{png,jpg,jpeg,gif,webp,svg,ico,woff,woff2}",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },

  // Enable compression
  compress: true,

  // Remove x-powered-by header
  poweredByHeader: false,

  // Allow server-side modules for pdf-parse, mammoth, docx (Node.js only packages)
  serverExternalPackages: ["pdf-parse", "mammoth", "docx", "sharp"],
};

export default nextConfig;
