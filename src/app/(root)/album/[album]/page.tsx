import { checkExist, getAlbumSongs } from "@/database/data";
import EmptyGeneral from "@/ui/general/NoExist/EmptyGeneral";
import ListPageView from "@/ui/general/SongPageView/ListPageView";
import PageTrackItemContainer from "@/ui/general/SongPageView/PageTrackItemContainer";
import { notFound } from "next/navigation";

async function page(props: { params: Promise<{ album: string }> }) {
  const params = await props.params;
  const { exists, error: checkExistError } = await checkExist(
    "album",
    params.album,
  );
  if (checkExistError) throw new Error("page-load-error");
  if (!exists) notFound();

  const { data, error } = await getAlbumSongs(params.album);

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
