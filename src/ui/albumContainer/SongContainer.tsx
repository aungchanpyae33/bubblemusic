"use client";

import Track from "../trackComponent/Track";

import { useSongsDataContext } from "./ContextSongsData";

function SongContainer() {
  const { songsData } = useSongsDataContext();
  if (!songsData || !songsData.songs) return;
  const songsList = songsData.songs;
  return (
    <tbody className=" ">
      {songsList &&
        songsList.idArray.map((id, index) => {
          const item = songsList.byId[`${id}`];
          if (!item) return;
          return (
            //need to test playlist url when click track of toggleElement
            <Track
              key={item.id}
              listSong={songsData}
              index={index}
              song={item}
              //for accessbility
              // roleCell={rowCell}
              // dataInc={dataInc}
            />
          );
        })}
    </tbody>
  );
}

export default SongContainer;
