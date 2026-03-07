"use client";
import { useContext } from "react";
import { removeLike } from "@/actions/removeLike";
import { addLike } from "@/actions/addLike";
import OptionIconEl from "../general/optionBox/OptionIconEl";
import IconWrapper from "../general/IconWrapper";
import { Heart } from "lucide-react";
import clsx from "clsx";
import OptionItem from "../general/optionBox/OptionItem";
import { InfoTrackContext } from "./ContextInfoTrack";
import OptionButton from "../general/optionBox/OptionButton";
import { LikeContext } from "./ContextLike";
import { useTranslations } from "next-intl";
import OptionText from "../general/optionBox/OptionText";

function ToggleHeartContent() {
  const b = useTranslations("block");
  const { song } = useContext(InfoTrackContext);
  const { isLike, setLikeAction } = useContext(LikeContext);
  if (!song) return;
  const songId = song.song_id;

  const removeLikeAction = removeLike.bind(null, songId);
  const addLikeAction = addLike.bind(null, songId);

  async function handleLike() {
    if (isLike) {
      const { error } = await removeLikeAction();
      if (error) {
        console.log("failed to removelike");
      } else {
        setLikeAction({ [songId]: false });
      }
    } else {
      const { error } = await addLikeAction();
      if (error) {
        console.log("failed to like");
      } else {
        setLikeAction({ [songId]: true });
      }
    }
  }

  return (
    <OptionItem>
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
    </OptionItem>
  );
}
export default ToggleHeartContent;
