"use client";
import { RefObject } from "react";

import SearchResultItem from "./SearchResultItem";
import useNaviSearch from "@/lib/CustomHooks/useNaviSearch";
import SearchResultContainer from "./SearchResultContainer";
import type { SearchInputItem } from "../../../database.types-fest";

interface prop {
  data: SearchInputItem[];
  inputRef: RefObject<HTMLInputElement | null>;
}

function SearchResult({ data, inputRef }: prop) {
  const [arrow] = useNaviSearch({ run: false, number: -1 }, inputRef, data);

  return (
    <SearchResultContainer>
      {data.map((item: SearchInputItem, index: number) => (
        <SearchResultItem
          type={item.type}
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
