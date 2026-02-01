import AlbumUpperBackground from "../albumContainer/AlbumUpperBackground";
import AlbumUpperContainer from "../albumContainer/AlbumUpperContainer";
import ContextSongListContainer from "./playlistOption/ContextSongListContainer";
import { listSongsSection } from "@/database/data";
import ListContainer from "../general/ListContainerOption/ListContainer";
import ListContainerPlayBack from "../general/ListContainerOption/ListContainerPlayBack";
import ListContainerAddToLibrary from "../general/ListContainerOption/ListContainerAddToLibrary";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import MoreOption from "../trackComponent/MoreOption";
import SongListContainerOption from "../general/optionBox/SongListContainerOption";
import AudiosContainer from "../albumContainer/AudiosContainer";
import VerticalThreeDots from "../general/icon/VerticalThreeDots";

import { outputRelative } from "@/lib/outputRelative";
function View({ songs }: { songs: ListSongPage }) {
  return (
    <div className=" w-full">
      <AlbumUpperBackground>
        <AlbumUpperContainer songs={songs} />
      </AlbumUpperBackground>
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
