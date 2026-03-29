import { checkExist, getSongTrack } from "@/database/data";
import PageTrackItemContainer from "@/ui/general/SongPageView/PageTrackItemContainer";
import TrackPageView from "@/ui/general/SongPageView/TrackPageView";
import { notFound } from "next/navigation";

async function page(props: { params: Promise<{ track: string }> }) {
  const { track } = await props.params;

  const { exists, error: checkExistError } = await checkExist("track", track);
  if (checkExistError) throw new Error("page-load-error");
  if (!exists) notFound();

  const { data, error } = await getSongTrack(track);

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
