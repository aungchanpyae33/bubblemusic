import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ListContainer from "../general/ListContainerOption/ListContainer";
import ListContainerPlayBack from "../general/ListContainerOption/ListContainerPlayBack";
import ListContainerAddToLibrary from "../general/ListContainerOption/ListContainerAddToLibrary";
import type { ListSongPage } from "@/database/data-types-return";
import PlaylistUpperWrapper from "./PlaylistUpperWrapper";
import ListOption from "../ListContainer/ListOption";
import ContextSongListContainer from "@/Context/ContextSongListContainer";
import EditablePageTrackItemContainer from "./EditablePageTrackItemContainer";
const inPage = true;
function OwnEditable({
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
      <div className=" w-full my-5 ">
        <ContextSongListContainer inPage={inPage} id={songs.id} list={songs}>
          <PlaylistUpperWrapper />
          <ListContainer>
            <ListContainerPlayBack list={songs} />
            {!songs.flag && songs.flag !== "user-specific" && (
              <ListContainerAddToLibrary />
            )}
            <div>
              <ListOption inPage={inPage} list={songs} />
            </div>
          </ListContainer>

          <EditablePageTrackItemContainer
            playlistId={id}
            description={description}
          />
        </ContextSongListContainer>
      </div>
    </HydrationBoundary>
  );
}

export default OwnEditable;
