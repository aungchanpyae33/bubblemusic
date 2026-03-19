import SearchContainer from "./SearchContainer";
import SearchListContainerTitle from "./SearchListContainerTitle";
import SearchListContainer from "./SearchListContainer";
import type { GetSearchPage } from "@/database/data-types-return";
import type { MediaItemType } from "../../../database.types-fest";
import SingleItemSong from "../general/SingleItemRow/SingleItemSong";

interface SearchSongSectionProps {
  title: MediaItemType;
  songs: GetSearchPage["songs"];
}

function SearchSongSection({ title, songs }: SearchSongSectionProps) {
  if (!songs || songs.idArray.length === 0) return;
  return (
    <SearchContainer>
      <SearchListContainerTitle title={title} />
      <SearchListContainer>
        {songs.idArray.map((id) => {
          const item = songs.byId[id];
          return <SingleItemSong key={item.id} song={item} />;
        })}
      </SearchListContainer>
    </SearchContainer>
  );
}

export default SearchSongSection;
