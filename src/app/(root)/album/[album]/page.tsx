import ContextSongListContainer from "@/Context/ContextSongListContainer";
import { getAlbumSongs } from "@/database/data";
import PageTrackItemContainer from "@/ui/albumContainer/PageTrackItemContainer";
import ListContainer from "@/ui/general/ListContainerOption/ListContainer";
import ListContainerAddToLibrary from "@/ui/general/ListContainerOption/ListContainerAddToLibrary";
import ListContainerPlayBack from "@/ui/general/ListContainerOption/ListContainerPlayBack";
import ListOption from "@/ui/ListContainer/ListOption";
import ListUpperWrapper from "@/ui/ListContainer/ListUpperWrapper";

async function page(props: { params: Promise<{ album: string }> }) {
  const params = await props.params;
  const { data, error } = await getAlbumSongs(params.album);

  if (!data || error) return;
  const { songs } = data;
  if (!songs) return;
  return (
    <div className=" w-full">
      <ListUpperWrapper list={songs} />
      <ContextSongListContainer id={songs.id} list={songs}>
        <ListContainer>
          <ListContainerPlayBack list={songs} />
          <ListContainerAddToLibrary />

          <div>
            <ListOption list={songs} />
          </div>
        </ListContainer>
      </ContextSongListContainer>

      <PageTrackItemContainer description="album" listSong={songs} />
    </div>
  );
}

export default page;
