"use client";
import { Heart } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import clsx from "clsx";
import { addLike } from "@/actions/addLike";
import { removeLike } from "@/actions/removeLike";
import { useLikeContext } from "./ContextLike";

function ToggleHeartButton({ songId }: { songId: string }) {
  const { isLike, setLikeAction } = useLikeContext();
  const addLikeAction = addLike.bind(null, songId);
  const removeLikeAction = removeLike.bind(null, songId);
  async function handleLike() {
    if (isLike) {
      const { error } = await removeLikeAction();
      if (error) {
        console.log("failed to removelike", error);
      } else {
        setLikeAction({ [songId]: false });
      }
    } else {
      const { error } = await addLikeAction();
      if (error) {
        console.log("failed to like", error);
      } else {
        setLikeAction({ [songId]: true });
      }
    }
  }

  return (
    <button
      className=" group-hover:opacity-100 opacity-0 group-focus-within:opacity-100 "
      onClick={handleLike}
    >
      <IconWrapper
        Icon={Heart}
        size="small"
        className={clsx("", {
          "fill-foreground": isLike,
        })}
      />
    </button>
  );
}

export default ToggleHeartButton;
