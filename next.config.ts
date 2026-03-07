import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  cacheComponents: true,

  // reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "njjvikpbvsfomrpyxnta.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/bubblemusic/source/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
