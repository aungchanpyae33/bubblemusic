"use client";
import { useTranslations } from "next-intl";
import { useInfoTrackContext } from "@/Context/ContextInfoTrack";
import OptionItem from "../OptionUI/OptionItem";
import OptionButton from "../OptionUI/OptionButton";
import OptionIconEl from "../OptionUI/OptionIconEl";
import IconWrapper from "@/ui/general/IconWrapper";
import OptionText from "../OptionUI/OptionText";
import { ListPlus } from "lucide-react";
import {
  addSongsToPlaylistModalBox,
  useAddSongsToPlaylistModalBox,
} from "@/lib/zustand";
import { useOriginParentTriggerContext } from "@/Context/ContextOriginParentTrigger";
function AddSongButton() {
  const b = useTranslations("block");
  const { song } = useInfoTrackContext();
  const addSongsToPlaylistModalBox = useAddSongsToPlaylistModalBox(
    (state: addSongsToPlaylistModalBox) => state.addSongsToPlaylistModalBox,
  );
  const { originParentTriggerRef } = useOriginParentTriggerContext();
  if (!song) return null;
  const songId = song.song_id;
  const cover_url = song.cover_url;

  function addSongs() {
    addSongsToPlaylistModalBox({ songId, cover_url, originParentTriggerRef });
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
