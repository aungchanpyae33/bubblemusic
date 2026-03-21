"use client";

import { useSongsDataContext } from "@/Context/ContextSongsData";
import Track from "../Track/Track";

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
