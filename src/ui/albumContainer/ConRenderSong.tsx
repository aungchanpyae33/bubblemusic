"use client";
import { ReactNode, useContext } from "react";
import { SongsDataContext } from "./ContextSongsData";
function ConRenderSong({
  container,
  empty,
}: {
  container: ReactNode;
  empty: ReactNode;
}) {
  const { songsData } = useContext(SongsDataContext);
  if (!songsData || !songsData.songs) return;
  const songsList = songsData.songs;

  return songsList && songsList.idArray.length > 0 ? container : empty;
}

export default ConRenderSong;
