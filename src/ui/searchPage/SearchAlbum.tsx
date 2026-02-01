import SearchContainer from "./SearchContainer";
import SearchListContainerTitle from "./SearchListContainerTitle";
import SearchListContainer from "./SearchListContainer";

import SearchAlbumItem from "./SearchAlbumItem";
import type { GetSearchPage } from "@/database/data-types-return";

interface SearchAlbumProps {
  title: string;
  albums: GetSearchPage["albums"];
}
function SearchAlbum({ title, albums }: SearchAlbumProps) {
  if (!albums || albums.idArray.length === 0) return;

  return (
    <SearchContainer>
      <SearchListContainerTitle title={title} />
      <SearchListContainer>
        {albums.idArray.map((id, index) => {
          const item = albums.byId[id];
          return (
            <SearchAlbumItem
              key={item.id}
              description="test"
              index={index}
              Itemdata={item}
            />
          );
        })}
      </SearchListContainer>
    </SearchContainer>
  );
}

export default SearchAlbum;
