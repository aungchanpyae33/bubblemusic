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
      .from("song")
      .select("id,created_at,cover_url");

    if (error || !data) {
      console.error("track sitemap fetch failed:", error);
      return [];
    }

    return data.map((track) => ({
      url: `${baseUrl}/track/${track.id}`,
      lastModified: new Date(track.created_at),
      changeFrequency: "weekly",
      priority: 0.8,
      images: track.cover_url
        ? [track.cover_url]
        : [
            "https://njjvikpbvsfomrpyxnta.supabase.co/storage/v1/object/public/bubblemusic/bubble-assets/image/music.png",
          ],
    }));
  } catch (error) {
    console.error("Failed to generate track sitemap:", error);
    return [];
  }
}
