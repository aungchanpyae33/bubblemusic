import ContextToggle from "@/Context/ContextToggle";
import SearchInput from "./SearchInput";

function SearchBar() {
  return (
    <div className="h-full">
      <ContextToggle>
        <SearchInput />
      </ContextToggle>
    </div>
  );
}

export default SearchBar;
