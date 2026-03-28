import { checkExist, getAlbumSongs } from "@/database/data";
import ListPageView from "@/ui/general/SongPageView/ListPageView";
import PageTrackItemContainer from "@/ui/general/SongPageView/PageTrackItemContainer";
import { notFound } from "next/navigation";

async function page(props: { params: Promise<{ album: string }> }) {
  const params = await props.params;
  const { exists } = await checkExist("album", params.album);
  if (!exists) notFound();

  const { data, error } = await getAlbumSongs(params.album);

  if (!data || error) return;
  const { songs } = data;
  if (!songs) return;
  return (
    <ListPageView songs={songs}>
      <PageTrackItemContainer description="album" listSong={songs} />
    </ListPageView>
  );
}

export default page;
