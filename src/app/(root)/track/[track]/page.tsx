import { checkExist, getSongTrack } from "@/database/data";
import PageTrackItemContainer from "@/ui/general/SongPageView/PageTrackItemContainer";
import TrackPageView from "@/ui/general/SongPageView/TrackPageView";
import { notFound } from "next/navigation";

async function page(props: { params: Promise<{ track: string }> }) {
  const { track } = await props.params;

  const { exists } = await checkExist("track", track);
  if (!exists) notFound();

  const { data, error } = await getSongTrack(track);

  if (!data || error) return;
  const { songs } = data;
  if (!songs) return;
  if (!songs.songs) return;

  const songsInfo = songs.songs.byId[track];

  return (
    <TrackPageView songs={songs} songsInfo={songsInfo}>
      <PageTrackItemContainer description="track" listSong={songs} />
    </TrackPageView>
  );
}

export default page;
