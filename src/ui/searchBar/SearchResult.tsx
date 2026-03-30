"use client";
import { RefObject } from "react";
import { Movie } from "@/database/data";

import SearchResultItem from "./SearchResultItem";
import useNaviSearch from "@/lib/CustomHooks/useNaviSearch";
import SearchResultContainer from "./SearchResultContainer";

interface prop {
  data: Movie[];
  inputRef: RefObject<HTMLInputElement | null>;
}

function SearchResult({ data, inputRef }: prop) {
  const [arrow] = useNaviSearch({ run: false, number: -1 }, inputRef, data);

  return (
    <SearchResultContainer>
      {data.map((item: Movie, index: number) => (
        <SearchResultItem
          inputRef={inputRef}
          key={item.id}
          title={item.name}
          show={index === arrow.number && !arrow.run}
        />
      ))}
    </SearchResultContainer>
  );
}

export default SearchResult;
