import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ContextSongListContainer from "./playlistOption/ContextSongListContainer";
import ListContainer from "../general/ListContainerOption/ListContainer";
import ListContainerPlayBack from "../general/ListContainerOption/ListContainerPlayBack";
import ListContainerAddToLibrary from "../general/ListContainerOption/ListContainerAddToLibrary";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import MoreOption from "../trackComponent/MoreOption";
import SongListContainerOption from "../general/optionBox/SongListContainerOption";
import EditableAudiosContainer from "../albumContainer/EditableAudiosContainer";
import VerticalThreeDots from "../general/icon/VerticalThreeDots";
import type { ListSongPage } from "@/database/data-types-return";
import { outputRelative } from "@/lib/outputRelative";
import PlaylistUpperWrapper from "./PlaylistUpperWrapper";

function OwnEdit({
  queryClient,
  songs,
  id,
  description,
}: {
  queryClient: QueryClient;
  songs: ListSongPage;
  id: string;
  description: string;
}) {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className=" w-full">
        <ContextSongListContainer id={songs.id} list={songs}>
          <PlaylistUpperWrapper />
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

          <EditableAudiosContainer playlistId={id} description={description} />
        </ContextSongListContainer>
      </div>
    </HydrationBoundary>
  );
}

export default OwnEdit;
