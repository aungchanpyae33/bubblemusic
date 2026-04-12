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
      .from("users")
      .select("user_id,created_at,cover_url");

    if (error || !data) {
      console.error("User sitemap fetch failed:", error);
      return [];
    }

    return data.map((profile) => ({
      url: `${baseUrl}/profile/${profile.user_id}`,
      lastModified: new Date(profile.created_at),
      changeFrequency: "weekly",
      priority: 0.8,
      images: profile.cover_url
        ? [profile.cover_url]
        : [
            "https://njjvikpbvsfomrpyxnta.supabase.co/storage/v1/object/public/bubblemusic/bubble-assets/image/human.png",
          ],
    }));
  } catch (error) {
    console.error("Failed to generate user sitemap:", error);
    return [];
  }
}
