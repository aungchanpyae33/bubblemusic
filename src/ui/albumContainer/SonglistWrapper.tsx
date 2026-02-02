"use client";
import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ContainerContext } from "./ContextContainer";
import ScrollLeftButton from "./ScrollLeftButton";
import ScrollRightButton from "./ScrollRightButton";
import { useScrollArrows } from "@/lib/CustomHooks/useScrollArrow";
import { isTouchPointer } from "@/lib/isTouchPointer";

function SonglistWrapper({ children }: { children: React.ReactNode }) {
  const { arrowNaviRef, playlistWrapperRef } = useContext(ContainerContext);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  const { showLeft, showRight, updateArrows, hideArrows } = useScrollArrows();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setPortalTarget(arrowNaviRef.current);
  }, [arrowNaviRef]);
  return (
    <div
      className=" max-w-fit p-4 gap-2 md:gap-4 lg:gap-6 flex  no-scrollbar snap-x scroll-smooth   overflow-y-visible overflow-x-auto"
      ref={playlistWrapperRef}
      onScroll={(e) => {
        if (isHovered) {
          updateArrows(e);
        }
      }}
      onPointerEnter={(e) => {
        if (isTouchPointer(e)) return;
        setIsHovered(true);
        updateArrows(e);
      }}
      onPointerLeave={(e) => {
        if (isTouchPointer(e)) return;
        setIsHovered(false);
        hideArrows();
      }}
    >
      {showRight &&
        portalTarget &&
        createPortal(<ScrollRightButton />, portalTarget)}
      {showLeft &&
        portalTarget &&
        createPortal(<ScrollLeftButton />, portalTarget)}

      {children}
    </div>
  );
}

export default SonglistWrapper;
