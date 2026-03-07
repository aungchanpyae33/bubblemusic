"use client";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchResult from "./SearchResult";
import FormContainer from "./FormContainer";
import SearchResultWrapper from "./SearchResultWrapper";
import { useSearchParams } from "next/navigation";

function SearchInput() {
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get("query") || "";
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue);
  const searchAbortController = useRef<AbortController | null>(null);

  async function fetchInput(params: string | null) {
    if (searchAbortController.current) {
      searchAbortController.current.abort("new search initiated");
    }
    searchAbortController.current = new AbortController();
    const signal = searchAbortController.current.signal;

    if (params && params.length > 0) {
      const fetchData = await fetch(`/api/search?with=${params}`, {
        signal,
      });
      const { data, error } = await fetchData.json();
      if (error) throw new Error(error);
      return data;
    }
    return [];
  }

  const { data = [], error } = useQuery({
    queryKey: ["search", value],
    queryFn: () => fetchInput(value!),
    placeholderData: (previousData) => previousData,
    staleTime: 10 * 60 * 1000,
  });
  // [todo] need to return error component
  if (error) return;
  return (
    <FormContainer inputRef={inputRef} value={value} setValue={setValue}>
      {data.length > 0 && (
        <SearchResultWrapper>
          <SearchResult data={data} inputRef={inputRef} />
        </SearchResultWrapper>
      )}
    </FormContainer>
  );
}

export default SearchInput;
