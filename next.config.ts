// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.escuelajs.co"    },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co"        },
      { protocol: "https", hostname: "i.imgur.com"         },
      { protocol: "http",  hostname: "**"                  },
    ],
  },
  // ✅ Suppress middleware deprecation if using older convention
  experimental: {
    // Only add if Next.js version >= 15.3
  },
};

export default nextConfig;