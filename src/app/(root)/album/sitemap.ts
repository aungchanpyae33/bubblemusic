"use cache";
import { cacheLife } from "next/cache";
import { outputBaseUrl } from "@/lib/outputBaseUrl";
import type { MetadataRoute } from "next";
import { createClientWithoutCookies } from "@/database/serverWithoutCookies";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  cacheLife("days");
  const baseUrl = outputBaseUrl().toString();
  try {
    const supabase = createClientWithoutCookies();

    const { data, error } = await supabase
      .from("album")
      .select("id,created_at,cover_url");

    if (error || !data) {
      console.error("album sitemap fetch failed:", error);
      return [];
    }

    return data.map((album) => ({
      url: `${baseUrl}/album/${album.id}`,
      lastModified: new Date(album.created_at),
      changeFrequency: "weekly",
      priority: 0.8,
      images: album.cover_url
        ? [album.cover_url]
        : [
            "https://njjvikpbvsfomrpyxnta.supabase.co/storage/v1/object/public/bubblemusic/bubble-assets/image/music.png",
          ],
    }));
  } catch (error) {
    console.error("Failed to generate album sitemap:", error);
    return [];
  }
}
