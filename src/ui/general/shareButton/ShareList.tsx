"use client";
import { useContext } from "react";
import { Link2 } from "lucide-react";
import IconWrapper from "../IconWrapper";
import OptionItem from "../optionBox/OptionItem";
import OptionIconEl from "../optionBox/OptionIconEl";
import {
  SongListContext,
  SongListValue,
} from "@/ui/playlist/playlistOption/ContextSongListContainer";
import OptionButton from "../optionBox/OptionButton";

function ShareList() {
  const { id, type } = useContext(SongListContext) as SongListValue;
  const handleCopy = async () => {
    const origin = window.location.origin;
    try {
      await navigator.clipboard.writeText(`${origin}/${type}/${id}`);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <OptionItem>
      <OptionButton className="flex items-center" action={handleCopy}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={Link2} />
        </OptionIconEl>
        <span>share </span>
      </OptionButton>
    </OptionItem>
  );
}

export default ShareList;
