import { cacheCheckExist, cacheGetSongTrack } from "@/database/data-cache";
import { outputBaseUrl } from "@/lib/outputBaseUrl";
import PageTrackItemContainer from "@/ui/general/SongPageView/PageTrackItemContainer";
import TrackPageView from "@/ui/general/SongPageView/TrackPageView";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ track: string }>;
}): Promise<Metadata> {
  const meta = await getTranslations("MetaData");

  const params = await props.params;
  const { exists, error: checkExistError } = await cacheCheckExist(
    "track",
    params.track,
  );

  if (checkExistError) throw new Error("page-load-error");
  if (!exists) notFound();

  const { data, error } = await cacheGetSongTrack(params.track);

  if (!data || error) throw new Error("page-load-error");
  const { songs } = data;
  if (!songs) throw new Error("page-load-error");
  if (!songs.songs) throw new Error("page-load-error");

  return {
    title: meta("trackPage.title", { track: data.songs.name }),
    description: meta("trackPage.description", { track: data.songs.name }),
    metadataBase: outputBaseUrl(),
    openGraph: {
      url: `/track/${params.track}`,
      type: "music.song",
    },
  };
}

async function page(props: { params: Promise<{ track: string }> }) {
  const { track } = await props.params;

  const { exists, error: checkExistError } = await cacheCheckExist(
    "track",
    track,
  );
  if (checkExistError) throw new Error("page-load-error");
  if (!exists) notFound();

  const { data, error } = await cacheGetSongTrack(track);

  if (!data || error) throw new Error("page-load-error");
  const { songs } = data;
  if (!songs) throw new Error("page-load-error");
  if (!songs.songs) throw new Error("page-load-error");

  const songsInfo = songs.songs.byId[track];

  return (
    <TrackPageView songs={songs} songsInfo={songsInfo}>
      <PageTrackItemContainer description="track" listSong={songs} />
    </TrackPageView>
  );
}

export default page;
