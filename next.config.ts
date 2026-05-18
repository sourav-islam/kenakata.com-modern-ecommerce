import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: "https", hostname: "api.escuelajs.co"    },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co"        },
      { protocol: "https", hostname: "i.imgur.com"         },
      { protocol: "http",  hostname: "**"                  },
    ],
  },
};

export default nextConfig;
