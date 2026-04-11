"use cache";
import { outputBaseUrl } from "@/lib/outputBaseUrl";
import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";

export default function sitemap(): MetadataRoute.Sitemap {
  cacheLife("days");
  const baseUrl = outputBaseUrl().toString();
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
      images: [`${baseUrl}/opengraph-image.png`],
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: new Date(),
      priority: 0.6,
      changeFrequency: "monthly",
      images: [`${baseUrl}/opengraph-image.png`],
    },
    {
      url: `${baseUrl}/auth/sign-up`,
      lastModified: new Date(),
      priority: 0.6,
      changeFrequency: "monthly",
      images: [`${baseUrl}/opengraph-image.png`],
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
      priority: 0.3,
      changeFrequency: "daily",
      images: [`${baseUrl}/opengraph-image.png`],
    },
  ];
}
