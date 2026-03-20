import ContextToggle from "@/Context/ContextToggle";
import SearchInput from "./SearchInput";

function SearchBar() {
  return (
    <div className="">
      <ContextToggle>
        <SearchInput />
      </ContextToggle>
    </div>
  );
}

export default SearchBar;
