import SearchTrack from "./SearchTrack";
import SearchContainer from "./SearchContainer";
import SearchListContainerTitle from "./SearchListContainerTitle";
import SearchListContainer from "./SearchListContainer";
import type { GetSearchPage } from "@/database/data-types-return";
import type { SearchSong } from "../../../database.types-fest";

function SearchSongs({
  songs,
  title,
}: {
  songs: GetSearchPage["songs"];
  title: string;
}) {
  if (!songs || songs.idArray.length === 0) return;
  return (
    <SearchContainer>
      <SearchListContainerTitle title={title} />
      <SearchListContainer>
        {songs.idArray.map((id, index) => {
          const item = songs.byId[id];
          return (
            <SearchTrack
              key={item.id}
              song={item as SearchSong}
              index={index}
            />
          );
        })}
      </SearchListContainer>
    </SearchContainer>
  );
}

export default SearchSongs;
