import { Search } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import SearchResultContainer from "../searchBar/SearchResultContainer";
const widths = ["w-[60%]", "w-[50%]", "w-[43%]", "w-[70%]"];
const getWidth = (i: number) => widths[i % widths.length];
function SearchLoading() {
  return (
    <SearchResultContainer>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          className="p-2 sm:pl-4  relative rounded h-[45px] flex items-center cursor-pointer"
          key={i}
        >
          <div className=" sm:hidden  w-[58px] pl-1 h-full flex items-center">
            <IconWrapper Icon={Search} size="small" />
          </div>

          <div className="  flex-1 min-w-0 truncate">
            <div
              className={`${getWidth(i)} h-2 bg-surface-2 rounded  animate-pulse`}
            ></div>
          </div>
        </div>
      ))}
    </SearchResultContainer>
  );
}

export default SearchLoading;
