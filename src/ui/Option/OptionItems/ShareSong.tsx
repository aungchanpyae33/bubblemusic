"use client";

import { Link2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useInfoTrackContext } from "@/Context/ContextInfoTrack";
import OptionItem from "../OptionUI/OptionItem";
import OptionButton from "../OptionUI/OptionButton";
import OptionIconEl from "../OptionUI/OptionIconEl";
import IconWrapper from "@/ui/general/IconWrapper";
import OptionText from "../OptionUI/OptionText";

function ShareSong() {
  const b = useTranslations("block");
  const { song } = useInfoTrackContext();
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
