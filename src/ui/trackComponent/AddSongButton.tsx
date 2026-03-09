"use client";
import { addSongsToPlaylist, useAddSongsToPlaylist } from "@/lib/zustand";
import OptionItem from "../general/optionBox/OptionItem";
import { useInfoTrackContext } from "./ContextInfoTrack";
import OptionButton from "../general/optionBox/OptionButton";
import OptionIconEl from "../general/optionBox/OptionIconEl";
import { ListPlus } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import { useTranslations } from "next-intl";
import OptionText from "../general/optionBox/OptionText";
function AddSongButton() {
  const b = useTranslations("block");
  const { song } = useInfoTrackContext();
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
        <OptionText>{b("addToPlaylist")}</OptionText>
      </OptionButton>
    </OptionItem>
  );
}

export default AddSongButton;
