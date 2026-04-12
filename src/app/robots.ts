import { outputBaseUrl } from "@/lib/outputBaseUrl";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = outputBaseUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",

      // Only block the specific pages that shouldn't be in search results
      disallow: [
        "/auth/sign-up-success",
        "/search",
        "/search/*",
        "/*?q=",
        "/*?query=",
        "/library/*",
        "/playlist/like",
        "/mood/*",
        "/genre/*",
        "/profile/*/playlists",
      ],
    },
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/album/sitemap.xml`,
      `${baseUrl}/artist/sitemap.xml`,
      `${baseUrl}/profile/sitemap.xml`,
      `${baseUrl}/playlist/sitemap.xml`,
      `${baseUrl}/track/sitemap.xml`,
    ],
  };
}
