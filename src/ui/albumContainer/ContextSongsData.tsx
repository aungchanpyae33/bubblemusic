"use client";

import { createContext, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPlaylistSongsClient } from "@/database/client-data";
import type { ListSongPage } from "@/database/data-types-return";

interface SongsDataContextType {
  songsData: ListSongPage | null;
}

export const SongsDataContext = createContext<SongsDataContextType>({
  songsData: null,
});

function ContextSongsData({
  playlistId,
  children,
}: {
  playlistId: string;
  children: ReactNode;
}) {
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: () => getPlaylistSongsClient(playlistId),
  });
  if (queryError) return;
  const { data, error } = queryData || {};
  if (!data || error) {
    return null;
  }

  const { songs } = data;
  const value = { songsData: songs };
  return (
    <SongsDataContext.Provider value={value}>
      {children}
    </SongsDataContext.Provider>
  );
}

export default ContextSongsData;
