import {
  cacheCheckExist,
  cacheGetUserFullPlaylist,
} from "@/database/data-cache";
import { outputBaseUrl } from "@/lib/outputBaseUrl";
import EmptyGeneral from "@/ui/general/NoExist/EmptyGeneral";
import ListSongsUpFaceContent from "@/ui/LibraryPage/LibPagesUI/ListSongsUpFaceContent";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const meta = await getTranslations("MetaData");
  const { exists, error: checkExistError } = await cacheCheckExist(
    "profile",
    params.slug,
  );
  if (checkExistError) throw new Error("page-load-error");
  if (!exists) notFound();
  const { data, error } = await cacheGetUserFullPlaylist(params.slug);
  if (!data || error) throw new Error("page-load-error");
  return {
    title: meta("profilePlaylist.title"),
    description: meta("profilePlaylist.description"),
    metadataBase: outputBaseUrl(),
    openGraph: {
      images: [],
    },
    twitter: {
      images: [],
    },
  };
}
async function page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  const { exists, error: checkExistError } = await cacheCheckExist(
    "profile",
    params.slug,
  );
  if (checkExistError) throw new Error("page-load-error");
  if (!exists) notFound();

  const [l, fullPlaylistData] = await Promise.all([
    getTranslations("ListTitle"),
    cacheGetUserFullPlaylist(params.slug),
  ]);
  const { data, error } = fullPlaylistData;
  if (!data || error) throw new Error("page-load-error");
  const { result } = data;
  if (!result || result.idArray.length === 0) return <EmptyGeneral />;

  return <ListSongsUpFaceContent result={result} l={l} route="playlist" />;
}

export default page;
