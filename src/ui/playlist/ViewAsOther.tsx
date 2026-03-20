import ContextSongListContainer from "./playlistOption/ContextSongListContainer";
import ListContainer from "../general/ListContainerOption/ListContainer";
import ListContainerPlayBack from "../general/ListContainerOption/ListContainerPlayBack";
import ListContainerAddToLibrary from "../general/ListContainerOption/ListContainerAddToLibrary";
import type { ListSongPage } from "@/database/data-types-return";
import ListUpperWrapper from "../ListContainer/ListUpperWrapper";
import ListOption from "../ListContainer/ListOption";
import PageTrackItemContainer from "../albumContainer/PageTrackItemContainer";
function ViewAsOther({ songs }: { songs: ListSongPage }) {
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

export default ViewAsOther;
