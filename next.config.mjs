/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig;
