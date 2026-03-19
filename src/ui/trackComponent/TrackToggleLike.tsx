"use client";
import { Heart } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import clsx from "clsx";
import { useLikeContext } from "./ContextLike";
import ToggleLikeWrapper from "../general/Like/ToggleLikeWrapper";

function TrackToggleLike({ songId }: { songId: string }) {
  const { isLike } = useLikeContext();
  return (
    <ToggleLikeWrapper songId={songId}>
      {(handleLike) => (
        <button onClick={handleLike}>
          <IconWrapper
            Icon={Heart}
            size="exLarge"
            className={clsx("", {
              "fill-foreground": isLike,
            })}
          />
        </button>
      )}
    </ToggleLikeWrapper>
  );
}

export default TrackToggleLike;
