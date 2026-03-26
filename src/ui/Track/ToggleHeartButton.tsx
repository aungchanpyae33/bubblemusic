"use client";
import { Heart } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import clsx from "clsx";
import ToggleLikeWrapper from "../general/Like/ToggleLikeWrapper";
import { useLikeContext } from "@/Context/ContextLike";
import { useRef } from "react";
import ContextOriginParentTrigger from "@/Context/ContextOriginParentTrigger";

function ToggleHeartButton({ songId }: { songId: string }) {
  const { isLike } = useLikeContext();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  return (
    <ContextOriginParentTrigger originParentTriggerRef={buttonRef}>
      <ToggleLikeWrapper songId={songId}>
        {(handleLike) => (
          <button
            ref={buttonRef}
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
    </ContextOriginParentTrigger>
  );
}

export default ToggleHeartButton;
