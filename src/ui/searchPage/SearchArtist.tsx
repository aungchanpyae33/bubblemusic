import SearchContainer from "./SearchContainer";
import SearchListContainerTitle from "./SearchListContainerTitle";
import SearchListContainer from "./SearchListContainer";
import SearchArtistItem from "./SearchArtistItem";
import type { GetSearchPage } from "@/database/data-types-return";
import type { listInfo, SearchItem } from "../../../database.types-fest";

interface SearchArtistProps {
  title: Extract<listInfo["type"], "artist">;
  artists: GetSearchPage["artists"];
}

function SearchArtist({ title, artists }: SearchArtistProps) {
  if (!artists || artists.idArray.length === 0) return;
  return (
    <SearchContainer>
      <SearchListContainerTitle title={title} />
      <SearchListContainer>
        {artists.idArray.map((id) => {
          const item = artists.byId[id];
          return (
            <SearchArtistItem key={item.id} Itemdata={item as SearchItem} />
          );
        })}
      </SearchListContainer>
    </SearchContainer>
  );
}

export default SearchArtist;
