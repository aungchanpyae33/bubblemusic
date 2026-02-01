"use client";
import { useContext } from "react";

import Track from "../trackComponent/Track";

import { SongsDataContext } from "./ContextSongsData";

function SongContainer() {
  const { songsData } = useContext(SongsDataContext);
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
