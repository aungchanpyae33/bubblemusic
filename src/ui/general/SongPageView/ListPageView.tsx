import ContextSongListContainer from "@/Context/ContextSongListContainer";
import type { ListSongPage } from "@/database/data-types-return";
import ListUpperWrapper from "@/ui/ListContainer/ListUpperWrapper";
import ListContainer from "../ListContainerOption/ListContainer";
import ListContainerPlayBack from "../ListContainerOption/ListContainerPlayBack";
import ListContainerAddToLibrary from "../ListContainerOption/ListContainerAddToLibrary";
import ListOption from "@/ui/ListContainer/ListOption";
import { ReactNode } from "react";
function ListPageView({
  songs,
  children,
}: {
  songs: ListSongPage;
  children: ReactNode;
}) {
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
      {children}
    </div>
  );
}

export default ListPageView;
