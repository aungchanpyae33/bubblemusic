import SearchContainer from "./SearchContainer";
import SearchListContainerTitle from "./SearchListContainerTitle";
import SearchListContainer from "./SearchListContainer";
import SearchProfileItem from "./SearchProfileItem";
import type { GetSearchPage } from "@/database/data-types-return";
interface SearchProfileProps {
  title: string;
  profiles: GetSearchPage["profiles"];
}
function SearchProfile({ title, profiles }: SearchProfileProps) {
  if (!profiles || profiles.idArray.length === 0) return;
  return (
    <SearchContainer>
      <SearchListContainerTitle title={title} />
      <SearchListContainer>
        {profiles.idArray.map((id, index) => {
          const item = profiles.byId[id];
          return (
            <SearchProfileItem
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

export default SearchProfile;
