"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useScrollArrows } from "@/lib/CustomHooks/useScrollArrow";
import { isTouchPointer } from "@/lib/isTouchPointer";
import ScrollRightButton from "./ScrollRightButton";
import ScrollLeftButton from "./ScrollLeftButton";
import { useContainerContext } from "@/Context/ContextContainer";

function ListUpFaceContainerWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { arrowNaviRef, playlistWrapperRef } = useContainerContext();
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  const { showLeft, showRight, updateArrows, hideArrows } = useScrollArrows();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setPortalTarget(arrowNaviRef.current);
  }, [arrowNaviRef]);
  return (
    <div
      className=" max-w-fit px-4   gap-2 md:gap-4 lg:gap-6 flex snap-x scroll-smooth overflow-x-auto scroll-container"
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

export default ListUpFaceContainerWrapper;
