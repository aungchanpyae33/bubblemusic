"use client";
import { getUserLibClient } from "@/database/client-data";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";

import { generateByMergeWithLib } from "@/lib/generateByMergeWithLib";
import type { listInfo, MediaItemSource } from "../../database.types-fest";
import { ListSongPage } from "@/database/data-types-return";

export type SongListValue = listInfo & {
  source: MediaItemSource;
  inPage?: boolean;
};

export type SongListPageValue = ListSongPage & {
  source: MediaItemSource;
  inPage?: boolean;
};
// Default context value
const SongListContext = createContext<
  SongListValue | SongListPageValue | undefined
>(undefined);
interface ContextSongListContainerProps {
  id: string;
  list: listInfo | ListSongPage;
  inPage?: boolean;
  children: ReactNode;
}

export const useSongListContext = () => {
  const context = useContext(SongListContext);
  if (context === undefined) {
    throw new Error(
      "useSongListContext must be used within a SongListContext.Provider",
    );
  }
  return context;
};

function ContextSongListContainer({
  id,
  inPage,
  children,
  list,
}: ContextSongListContainerProps) {
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["user-library"],
    queryFn: () => getUserLibClient(),
  });
  if (queryError) return;
  const { data, error } = queryData || {};

  if (error?.name === "custom_auth_error") {
    const value = { ...list, source: "none", inPage } as
      | SongListValue
      | SongListPageValue;
    return (
      <SongListContext.Provider value={value}>
        {children}
      </SongListContext.Provider>
    );
  }

  if (!data || error) return;
  const { userLib } = data;
  if (!userLib) return;
  const isDataExist = userLib.byId[id];
  const value = generateByMergeWithLib(isDataExist, list, inPage);
  return (
    <SongListContext.Provider value={value}>
      {children}
    </SongListContext.Provider>
  );
}

export default ContextSongListContainer;
