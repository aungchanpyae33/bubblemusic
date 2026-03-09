"use client";
import { getUserLibClient } from "@/database/client-data";
import { generateValue } from "@/lib/generateValue";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

import { Database } from "../../../../database.types";
import type {
  listInfo,
  listSongsSection,
} from "../../../../database.types-fest";

export type SongListValue = (listInfo | listSongsSection) & {
  source: Database["public"]["Enums"]["media_source_type"];
};

// Default context value
export const SongListContext = createContext<SongListValue | undefined>(
  undefined,
);
interface ContextSongListContainerProps extends React.ComponentProps<"div"> {
  id: string;
  list: listInfo | listSongsSection;
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
  const value = generateValue(isDataExist, list);
  return (
    <SongListContext.Provider value={value}>
      {children}
    </SongListContext.Provider>
  );
}

export default ContextSongListContainer;
