"use client";

import Track from "../trackComponent/Track";

import { useSongsDataContext } from "./ContextSongsData";

function SongContainer() {
  const { songsData } = useSongsDataContext();
  if (!songsData || !songsData.songs) return;
  const songsList = songsData.songs;
  return (
    songsList &&
    songsList.idArray.map((id) => {
      const item = songsList.byId[id];
      if (!item) return;
      return <Track key={item.id} listSong={songsData} song={item} />;
    })
  );
}

export default SongContainer;
