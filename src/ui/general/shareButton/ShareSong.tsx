"use client";
import { useContext } from "react";

import { Link2 } from "lucide-react";
import IconWrapper from "../IconWrapper";
import { InfoTrackContext } from "@/ui/trackComponent/ContextInfoTrack";
import OptionItem from "../optionBox/OptionItem";
import OptionIconEl from "../optionBox/OptionIconEl";
import OptionButton from "../optionBox/OptionButton";
import { useTranslations } from "next-intl";
import OptionText from "../optionBox/OptionText";

function ShareSong() {
  const b = useTranslations("block");
  const { song } = useContext(InfoTrackContext);
  const songId = song?.song_id;
  const handleCopy = async () => {
    const origin = window.location.origin;

    try {
      await navigator.clipboard.writeText(`${origin}/track/${songId}`);
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
        <OptionText>{b("share")}</OptionText>
      </OptionButton>
    </OptionItem>
  );
}

export default ShareSong;
