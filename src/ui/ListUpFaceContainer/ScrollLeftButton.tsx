"use client";
import { ChevronLeft } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import ScrollHorizontal from "@/lib/ScrollHorizontal";
import { useContainerContext } from "../albumContainer/ContextContainer";

function ScrollLeftButton() {
  const { playlistWrapperRef } = useContainerContext();
  return (
    <button
      onClick={() => ScrollHorizontal("left", playlistWrapperRef)}
      className=" absolute z-20 left-0
       top-[40%]"
    >
      <IconWrapper
        size="medium"
        className="text-foreground/70 bg-surface-1 hover:bg-surface-2 hover:-translate-x-1 transition-transform duration-200 rounded-full size-14 hover:text-foreground"
        Icon={ChevronLeft}
      />
    </button>
  );
}

export default ScrollLeftButton;
