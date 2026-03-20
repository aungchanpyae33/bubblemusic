"use client";
import { getUserLibClient } from "@/database/client-data";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";
import type {
  listInfo,
  listSongsSection,
  MediaItemSource,
} from "../../../../database.types-fest";
import { generateByMergeWithLib } from "@/lib/generateByMergeWithLib";

export type SongListValue = (listInfo | listSongsSection) & {
  source: MediaItemSource;
};

// Default context value
const SongListContext = createContext<SongListValue | undefined>(undefined);
interface ContextSongListContainerProps {
  id: string;
  list: listInfo | listSongsSection;
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
  children,
  list,
}: ContextSongListContainerProps) {
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["user-library"],
    queryFn: () => getUserLibClient(),
  });
  if (queryError) return;
  const { data, error } = queryData || {};
  if (!data || error) return;
  const { userLib } = data;
  if (!userLib) return;
  const isDataExist = userLib.byId[id];
  const value = generateByMergeWithLib(isDataExist, list);
  return (
    <SongListContext.Provider value={value}>
      {children}
    </SongListContext.Provider>
  );
}

export default ContextSongListContainer;
