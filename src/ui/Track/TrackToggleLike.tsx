"use client";
import { Heart } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import clsx from "clsx";
import ToggleLikeWrapper from "../general/Like/ToggleLikeWrapper";
import { useLikeContext } from "@/Context/ContextLike";
import ContextOriginParentTrigger from "@/Context/ContextOriginParentTrigger";
import { useRef } from "react";

function TrackToggleLike({ songId }: { songId: string }) {
  const { isLike } = useLikeContext();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  return (
    <ContextOriginParentTrigger originParentTriggerRef={buttonRef}>
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
    </ContextOriginParentTrigger>
  );
}

export default TrackToggleLike;
