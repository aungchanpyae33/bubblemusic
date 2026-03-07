import { getArtistPage } from "@/database/data";
import { outputRelative } from "@/lib/outputRelative";
import AlbumUpperContainer from "@/ui/albumContainer/AlbumUpperContainer";
import AudiosContainer from "@/ui/albumContainer/AudiosContainer";
import Container from "@/ui/albumContainer/Container";
import VerticalThreeDots from "@/ui/general/icon/VerticalThreeDots";
import ListContainer from "@/ui/general/ListContainerOption/ListContainer";
import ListContainerAddToLibrary from "@/ui/general/ListContainerOption/ListContainerAddToLibrary";
import ListContainerPlayBack from "@/ui/general/ListContainerOption/ListContainerPlayBack";
import SongListContainerOption from "@/ui/general/optionBox/SongListContainerOption";
import ContextSongListContainer from "@/ui/playlist/playlistOption/ContextSongListContainer";
import MoreOption from "@/ui/trackComponent/MoreOption";
import MoreOptionContext from "@/ui/trackComponent/MoreOptionContext";
async function page(props: { params: Promise<{ artist: string }> }) {
  const params = await props.params;

  const { data, error } = await getArtistPage(params.artist);

  if (!data || error) return;
  const { songs, albums } = data;
  if (!songs && !albums) return;
  return (
    <div className=" w-full">
      <AlbumUpperContainer songs={songs} />
      {songs && (
        <ContextSongListContainer id={songs.id} list={songs}>
          <ListContainer>
            <ListContainerPlayBack list={songs} />
            <ListContainerAddToLibrary />

            <div>
              <MoreOptionContext
                relative={outputRelative(songs.related_id, songs.related_name)}
              >
                <MoreOption
                  targetElement={<SongListContainerOption />}
                  triggerEl={<VerticalThreeDots />}
                />
              </MoreOptionContext>
            </div>
          </ListContainer>
        </ContextSongListContainer>
      )}
      <div className=" space-y-3">
        {songs && (
          <AudiosContainer description="topSongsArtist" listSong={songs} />
        )}
        {albums && <Container songs={albums} description="album" />}
      </div>
    </div>
  );
}

export default page;
