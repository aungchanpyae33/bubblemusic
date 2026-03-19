import ContextSongListContainer from "./playlistOption/ContextSongListContainer";
import ListContainer from "../general/ListContainerOption/ListContainer";
import ListContainerPlayBack from "../general/ListContainerOption/ListContainerPlayBack";
import ListContainerAddToLibrary from "../general/ListContainerOption/ListContainerAddToLibrary";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import MoreOption from "../trackComponent/MoreOption";
import SongListContainerOption from "../general/optionBox/SongListContainerOption";
import AudiosContainer from "../albumContainer/AudiosContainer";
import VerticalThreeDots from "../general/icon/VerticalThreeDots";
import type { ListSongPage } from "@/database/data-types-return";
import { outputRelative } from "@/lib/outputRelative";
import ListUpperWrapper from "../ListContainer/ListUpperWrapper";
function View({ songs }: { songs: ListSongPage }) {
  return (
    <div className=" w-full">
      <ListUpperWrapper list={songs} />
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

      <AudiosContainer description="album" listSong={songs} />
    </div>
  );
}

export default View;
