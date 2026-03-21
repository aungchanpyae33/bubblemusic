"use client";
import { Heart } from "lucide-react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useInfoTrackContext } from "@/Context/ContextInfoTrack";
import { useLikeContext } from "@/Context/ContextLike";
import OptionItem from "../OptionUI/OptionItem";
import ToggleLikeWrapper from "@/ui/general/Like/ToggleLikeWrapper";
import OptionButton from "../OptionUI/OptionButton";
import OptionIconEl from "../OptionUI/OptionIconEl";
import IconWrapper from "@/ui/general/IconWrapper";
import OptionText from "../OptionUI/OptionText";

function ToggleHeartContent() {
  const b = useTranslations("block");
  const { song } = useInfoTrackContext();
  const { isLike } = useLikeContext();
  if (!song) return;
  const songId = song.song_id;

  return (
    <OptionItem>
      <ToggleLikeWrapper songId={songId}>
        {(handleLike) => (
          <OptionButton action={handleLike}>
            <OptionIconEl>
              <IconWrapper
                Icon={Heart}
                size="small"
                className={clsx("", {
                  "fill-foreground": isLike,
                })}
              />
            </OptionIconEl>
            <OptionText>
              {isLike ? b("like.removeLike") : b("like.addLike")}
            </OptionText>
          </OptionButton>
        )}
      </ToggleLikeWrapper>
    </OptionItem>
  );
}
export default ToggleHeartContent;
