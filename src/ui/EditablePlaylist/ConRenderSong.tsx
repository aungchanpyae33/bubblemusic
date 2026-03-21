"use client";
import { useSongsDataContext } from "@/Context/ContextSongsData";
import { ReactNode } from "react";
function ConRenderSong({
  container,
  empty,
}: {
  container: ReactNode;
  empty: ReactNode;
}) {
  const { songsData } = useSongsDataContext();
  if (!songsData || !songsData.songs) return;
  const songsList = songsData.songs;

  return songsList && songsList.idArray.length > 0 ? container : empty;
}

export default ConRenderSong;
