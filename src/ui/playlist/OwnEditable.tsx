import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ContextSongListContainer from "./playlistOption/ContextSongListContainer";
import ListContainer from "../general/ListContainerOption/ListContainer";
import ListContainerPlayBack from "../general/ListContainerOption/ListContainerPlayBack";
import ListContainerAddToLibrary from "../general/ListContainerOption/ListContainerAddToLibrary";
import type { ListSongPage } from "@/database/data-types-return";
import PlaylistUpperWrapper from "./PlaylistUpperWrapper";
import ListOption from "../ListContainer/ListOption";
import EditablePageTrackItemContainer from "../albumContainer/EditablePageTrackItemContainer";

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
      <div className=" w-full">
        <ContextSongListContainer id={songs.id} list={songs}>
          <PlaylistUpperWrapper />
          <ListContainer>
            <ListContainerPlayBack list={songs} />
            <ListContainerAddToLibrary />

            <div>
              <ListOption list={songs} />
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
