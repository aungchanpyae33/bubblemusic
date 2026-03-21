import { getArtistPage } from "@/database/data";
import ListPageView from "@/ui/general/SongPageView/ListPageView";
import PageTrackItemContainer from "@/ui/general/SongPageView/PageTrackItemContainer";
import ListUpFaceGroup from "@/ui/ListUpFaceContainer/ListUpFaceGroup";
async function page(props: { params: Promise<{ artist: string }> }) {
  const params = await props.params;

  const { data, error } = await getArtistPage(params.artist);

  if (!data || error) return;
  const { songs, albums } = data;
  if (!songs && !albums) return;
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
