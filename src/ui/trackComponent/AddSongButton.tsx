"use client";
import { useContext } from "react";
import { addSongsToPlaylist, useAddSongsToPlaylist } from "@/lib/zustand";
import OptionItem from "../general/optionBox/OptionItem";
import { InfoTrackContext } from "./ContextInfoTrack";
import OptionButton from "../general/optionBox/OptionButton";
import OptionIconEl from "../general/optionBox/OptionIconEl";
import { ListPlus } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
function AddSongButton() {
  const { song } = useContext(InfoTrackContext);
  const songId = song?.song_id;
  const cover_url = song?.cover_url;
  const addSongsToPlaylist = useAddSongsToPlaylist(
    (state: addSongsToPlaylist) => state.addSongsToPlaylist,
  );
  if (!songId) return null;
  function addSongs() {
    addSongsToPlaylist({ songId, cover_url });
  }
  return (
    <OptionItem>
      <OptionButton action={addSongs}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={ListPlus} />
        </OptionIconEl>
        <span>Add to the playlist</span>
      </OptionButton>
    </OptionItem>
  );
}

export default AddSongButton;
