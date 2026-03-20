"use client";
import OptionIconEl from "../general/optionBox/OptionIconEl";
import IconWrapper from "../general/IconWrapper";
import { Heart } from "lucide-react";
import clsx from "clsx";
import OptionItem from "../general/optionBox/OptionItem";
import OptionButton from "../general/optionBox/OptionButton";
import { useTranslations } from "next-intl";
import OptionText from "../general/optionBox/OptionText";
import ToggleLikeWrapper from "../general/Like/ToggleLikeWrapper";
import { useInfoTrackContext } from "@/Context/ContextInfoTrack";
import { useLikeContext } from "@/Context/ContextLike";

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
