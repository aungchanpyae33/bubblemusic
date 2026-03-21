"use client";
import { addSongsToPlaylist, useAddSongsToPlaylist } from "@/lib/zustand";
import { useTranslations } from "next-intl";
import { useInfoTrackContext } from "@/Context/ContextInfoTrack";
import OptionItem from "../OptionUI/OptionItem";
import OptionButton from "../OptionUI/OptionButton";
import OptionIconEl from "../OptionUI/OptionIconEl";
import IconWrapper from "@/ui/general/IconWrapper";
import OptionText from "../OptionUI/OptionText";
import { ListPlus } from "lucide-react";
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
