import SearchContainer from "./SearchContainer";
import SearchListContainerTitle from "./SearchListContainerTitle";
import SearchListContainer from "./SearchListContainer";

import SearchAlbumItem from "./SearchAlbumItem";
import type { GetSearchPage } from "@/database/data-types-return";
import type { listInfo } from "../../../database.types-fest";

interface SearchAlbumProps {
  title: Extract<listInfo["type"], "album">;
  albums: GetSearchPage["albums"];
}
function SearchAlbum({ title, albums }: SearchAlbumProps) {
  if (!albums || albums.idArray.length === 0) return;

  return (
    <SearchContainer>
      <SearchListContainerTitle title={title} />
      <SearchListContainer>
        {albums.idArray.map((id) => {
          const item = albums.byId[id];
          return <SearchAlbumItem key={item.id} Itemdata={item} />;
        })}
      </SearchListContainer>
    </SearchContainer>
  );
}

export default SearchAlbum;
