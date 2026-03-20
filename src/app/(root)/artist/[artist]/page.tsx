import ContextSongListContainer from "@/Context/ContextSongListContainer";
import { getArtistPage } from "@/database/data";
import PageTrackItemContainer from "@/ui/albumContainer/PageTrackItemContainer";
import ListContainer from "@/ui/general/ListContainerOption/ListContainer";
import ListContainerAddToLibrary from "@/ui/general/ListContainerOption/ListContainerAddToLibrary";
import ListContainerPlayBack from "@/ui/general/ListContainerOption/ListContainerPlayBack";
import ListOption from "@/ui/ListContainer/ListOption";
import ListUpperWrapper from "@/ui/ListContainer/ListUpperWrapper";
import ListUpFaceGroup from "@/ui/ListUpFaceContainer/ListUpFaceGroup";
async function page(props: { params: Promise<{ artist: string }> }) {
  const params = await props.params;

  const { data, error } = await getArtistPage(params.artist);

  if (!data || error) return;
  const { songs, albums } = data;
  if (!songs && !albums) return;
  return (
    <div className=" w-full">
      <ListUpperWrapper list={songs} />
      {songs && (
        <ContextSongListContainer id={songs.id} list={songs}>
          <ListContainer>
            <ListContainerPlayBack list={songs} />
            <ListContainerAddToLibrary />

            <div>
              <ListOption list={songs} />
            </div>
          </ListContainer>
        </ContextSongListContainer>
      )}
      <div className=" space-y-3">
        {songs && (
          <PageTrackItemContainer
            description="topSongsArtist"
            listSong={songs}
          />
        )}
        {albums && <ListUpFaceGroup list={albums} description="album" />}
      </div>
    </div>
  );
}

export default page;
