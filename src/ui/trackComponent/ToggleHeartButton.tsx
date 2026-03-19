"use client";
import { Heart } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import clsx from "clsx";
import { useLikeContext } from "./ContextLike";
import ToggleLikeWrapper from "../general/Like/ToggleLikeWrapper";

function ToggleHeartButton({ songId }: { songId: string }) {
  const { isLike } = useLikeContext();

  return (
    <ToggleLikeWrapper songId={songId}>
      {(handleLike) => (
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
      )}
    </ToggleLikeWrapper>
  );
}

export default ToggleHeartButton;
