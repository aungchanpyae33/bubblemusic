"use client";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchResult from "./SearchResult";
import FormContainer from "./FormContainer";
import SearchResultWrapper from "./SearchResultWrapper";
import SearchLoading from "../loading/SearchLoading";
import { searchGuard } from "@/lib/searchGuard";
import NoExistSearchResult from "../NoExist/NoExistSearchResult";
import ErrorSearch from "../Error/ErrorSearch";

function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const searchAbortController = useRef<AbortController | null>(null);
  async function fetchInput(params: string) {
    if (searchAbortController.current) {
      searchAbortController.current.abort("new search initiated");
    }
    searchAbortController.current = new AbortController();
    const signal = searchAbortController.current.signal;
    if (searchGuard(params)) return [];
    try {
      const fetchData = await fetch(`/api/search?with=${params}`, {
        signal,
      });

      const { data, error } = await fetchData.json();
      if (error) throw new Error(error);
      return data;
    } catch (error) {
      throw error;
    }
  }

  const { data = [], status } = useQuery({
    queryKey: ["search", value],
    queryFn: () => fetchInput(value),
    staleTime: 10 * 60 * 1000,
  });
  const showLoading = status === "pending";

  let content = null;

  if (status === "error") {
    content = <ErrorSearch />;
  } else if (showLoading) {
    content = <SearchLoading />;
  } else if (data.length > 0) {
    content = <SearchResult data={data} inputRef={inputRef} />;
  } else if (!searchGuard(value) && value.length > 0) {
    content = <NoExistSearchResult />;
  }
  return (
    <FormContainer inputRef={inputRef} setValue={setValue}>
      <SearchResultWrapper>{content}</SearchResultWrapper>
    </FormContainer>
  );
}

export default SearchInput;
