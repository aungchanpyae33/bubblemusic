import { checkExist } from "@/database/data";
import { cacheCheckExist, cacheGetAlbumSongs } from "@/database/data-cache";
import { outputBaseUrl } from "@/lib/outputBaseUrl";
import EmptyGeneral from "@/ui/general/NoExist/EmptyGeneral";
import ListPageView from "@/ui/general/SongPageView/ListPageView";
import PageTrackItemContainer from "@/ui/general/SongPageView/PageTrackItemContainer";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ album: string }>;
}): Promise<Metadata> {
  const meta = await getTranslations("MetaData");

  const params = await props.params;
  const { exists, error: checkExistError } = await cacheCheckExist(
    "album",
    params.album,
  );

  if (checkExistError) throw new Error("page-load-error");
  if (!exists) notFound();

  const { data, error } = await cacheGetAlbumSongs(params.album);

  if (!data || error) throw new Error("page-load-error");

  return {
    title: meta("albumPage.title", { album: data.songs.name }),
    description: meta("albumPage.description", {
      album: data.songs.name,
      artistName: data.songs.related_name,
    }),
    metadataBase: outputBaseUrl(),
    openGraph: {
      url: `/album/${params.album}`,
      type: "music.album",
    },
  };
}

async function page(props: { params: Promise<{ album: string }> }) {
  const params = await props.params;

  const { exists, error: checkExistError } = await checkExist(
    "album",
    params.album,
  );
  if (checkExistError) throw new Error("page-load-error");
  if (!exists) notFound();

  const { data, error } = await cacheGetAlbumSongs(params.album);

  if (!data || error) throw new Error("page-load-error");
  const { songs } = data;

  if (!songs || songs.songs?.idArray.length === 0) return <EmptyGeneral />;
  return (
    <ListPageView songs={songs}>
      <PageTrackItemContainer description="album" listSong={songs} />
    </ListPageView>
  );
}

export default page;
