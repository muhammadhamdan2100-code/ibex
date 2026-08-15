import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 768, 1024, 1280, 1440, 1728, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [],
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons", "three"],
  },

  // Next.js 16 defaults to Turbopack. Declaring this (even empty) tells
  // Next we've deliberately opted into Turbopack rather than leaving a
  // stale webpack config it has to guess about. Model-loader rules
  // (.glb/.gltf/.hdr/.exr) will be added here as Turbopack `rules` once
  // real 3D assets are introduced in Phase 3 — see:
  // https://nextjs.org/docs/app/api-reference/next-config-js/turbopack
  turbopack: {},

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
