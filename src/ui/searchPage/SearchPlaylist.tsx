import SearchContainer from "./SearchContainer";
import SearchListContainerTitle from "./SearchListContainerTitle";
import SearchListContainer from "./SearchListContainer";
import SearchListContainerItem from "./SearchListContainerItem";
import type { GetSearchPage } from "@/database/data-types-return";
import type { listInfo } from "../../../database.types-fest";

interface SearchPlaylistProps {
  title: Extract<listInfo["type"], "playlist">;
  playlists: GetSearchPage["playlists"];
}
function SearchPlaylist({ title, playlists }: SearchPlaylistProps) {
  if (!playlists || playlists.idArray.length === 0) return;
  return (
    <SearchContainer>
      <SearchListContainerTitle title={title} />
      <SearchListContainer>
        {playlists.idArray.map((id) => {
          const item = playlists.byId[id];
          return <SearchListContainerItem key={item.id} Itemdata={item} />;
        })}
      </SearchListContainer>
    </SearchContainer>
  );
}

export default SearchPlaylist;
