import { checkExist, getArtistPage } from "@/database/data";
import EmptyGeneral from "@/ui/general/NoExist/EmptyGeneral";
import ListPageView from "@/ui/general/SongPageView/ListPageView";
import PageTrackItemContainer from "@/ui/general/SongPageView/PageTrackItemContainer";
import ListUpFaceGroup from "@/ui/ListUpFaceContainer/ListUpFaceGroup";
import { notFound } from "next/navigation";
async function page(props: { params: Promise<{ artist: string }> }) {
  const params = await props.params;
  const { exists, error: checkExistError } = await checkExist(
    "artist",
    params.artist,
  );
  if (checkExistError) throw new Error("page-load-error");
  if (!exists) notFound();

  const { data, error } = await getArtistPage(params.artist);

  if (!data || error) throw new Error("page-load-error");
  const { songs, albums } = data;
  if (!songs && !albums) throw new Error("page-load-error");
  if (!songs || songs.songs?.idArray.length === 0) return <EmptyGeneral />;
  return (
    <ListPageView songs={songs}>
      <div className=" space-y-3">
        {songs && (
          <PageTrackItemContainer
            description="topSongsArtist"
            listSong={songs}
          />
        )}
        {albums && <ListUpFaceGroup list={albums} description="album" />}
      </div>
    </ListPageView>
  );
}

export default page;
