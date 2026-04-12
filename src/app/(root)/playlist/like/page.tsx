import { outputBaseUrl } from "@/lib/outputBaseUrl";
import { userFetch } from "@/lib/UserInfoFetch";
import LikeSongSection from "@/ui/LibraryPage/LibPagesUI/LikeSongSection";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { unauthorized } from "next/navigation";
export async function generateMetadata(): Promise<Metadata> {
  const meta = await getTranslations("MetaData");
  return {
    title: meta("likedSongPage.title"),
    description: meta("likedSongPage.description"),
    metadataBase: outputBaseUrl(),
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      images: [],
    },
    twitter: {
      images: [],
    },
  };
}
async function page() {
  const user = await userFetch();
  if (!user) {
    unauthorized();
  }
  return <LikeSongSection />;
}

export default page;
