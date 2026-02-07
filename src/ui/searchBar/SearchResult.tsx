"use client";
import { RefObject } from "react";
import { Movie } from "@/database/data";

import SearchResultItem from "./SearchResultItem";
import useNaviSearch from "@/lib/CustomHooks/useNaviSearch";

interface prop {
  data: Movie[];
  inputRef: RefObject<HTMLInputElement | null>;
}

function SearchResult({ data, inputRef }: prop) {
  const [arrow] = useNaviSearch({ run: false, number: -1 }, inputRef, data);

  return (
    <div className="SearchResult w-full absolute bg-surface-1 rounded-md -bottom-1 translate-y-full  border border-borderFull border-opacity-25  p-1   shadow-md shadow-overlay text-start">
      {data?.map((item: Movie, index: number) => (
        <SearchResultItem
          key={item.id}
          title={item.name}
          index={index}
          show={index === arrow.number && !arrow.run}
        />
      ))}
    </div>
  );
}

export default SearchResult;
