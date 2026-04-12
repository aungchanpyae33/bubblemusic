import { cacheCheckExist, cacheGetPlaylistSongs } from "@/database/data-cache";
import { outputBaseUrl } from "@/lib/outputBaseUrl";
import ConditonalRenderPlaylist from "@/ui/EditablePlaylist/ConditonalRenderPlaylist";
import OwnEditable from "@/ui/EditablePlaylist/OwnEditable";
import ListPageView from "@/ui/general/SongPageView/ListPageView";
import PageTrackItemContainer from "@/ui/general/SongPageView/PageTrackItemContainer";
import { QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const meta = await getTranslations("MetaData");

  const params = await props.params;
  const { exists, error: checkExistError } = await cacheCheckExist(
    "playlist",
    params.slug,
  );
  if (checkExistError) throw new Error("page-load-error");
  if (!exists) notFound();

  const { data, error } = await cacheGetPlaylistSongs(params.slug);
  if (!data || error) throw new Error("page-load-error");
  const { songs } = data;
  if (!songs) throw new Error("page-load-error");

  return {
    title: meta("playlistPage.title", { playlist: data.songs.name }),
    description: meta("playlistPage.description", {
      playlist: data.songs.name,
    }),
    metadataBase: outputBaseUrl(),
    openGraph: {
      url: `/playlist/${params.slug}`,
      type: "music.playlist",
    },
  };
}

async function page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { exists, error: checkExistError } = await cacheCheckExist(
    "playlist",
    params.slug,
  );
  if (checkExistError) throw new Error("page-load-error");
  if (!exists) notFound();

  const queryClient = new QueryClient();
  const { data, error } = await queryClient.fetchQuery({
    queryKey: ["playlist", params.slug],
    queryFn: () => cacheGetPlaylistSongs(params.slug),
  });

  if (!data || error) throw new Error("page-load-error");
  const { songs } = data;
  if (!songs) throw new Error("page-load-error");
  return (
    <ConditonalRenderPlaylist
      id={params.slug}
      OwnEditable={
        <OwnEditable
          queryClient={queryClient}
          songs={songs}
          id={params.slug}
          description={"playlist"}
        />
      }
      ViewAsOther={
        <ListPageView songs={songs}>
          <PageTrackItemContainer description="playlist" listSong={songs} />
        </ListPageView>
      }
    />
  );
}

export default page;
