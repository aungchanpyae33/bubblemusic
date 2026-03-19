import SearchContainer from "./SearchContainer";
import SearchListContainerTitle from "./SearchListContainerTitle";
import SearchListContainer from "./SearchListContainer";
import type { GetSearchPage } from "@/database/data-types-return";
import type { MediaItemType } from "../../../database.types-fest";
import SingleItemList from "../general/SingleItemRow/SingleItemList";

interface SearchSectionProps {
  title: MediaItemType;
  list: GetSearchPage[Exclude<keyof GetSearchPage, "top_result" | "songs">];
}

function SearchSection({ title, list }: SearchSectionProps) {
  if (!list || list.idArray.length === 0) return;
  return (
    <SearchContainer>
      <SearchListContainerTitle title={title} />
      <SearchListContainer>
        {list.idArray.map((id) => {
          const item = list.byId[id];
          return <SingleItemList key={item.id} list={item} />;
        })}
      </SearchListContainer>
    </SearchContainer>
  );
}

export default SearchSection;
