"use client";
import { useContext } from "react";
import { ContainerContext } from "./ContextContainer";
import { ChevronRight } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import ScrollHorizontal from "@/lib/ScrollHorizontal";

function ScrollRightButton() {
  const { playlistWrapperRef } = useContext(ContainerContext);

  return (
    <button
      onClick={() => ScrollHorizontal("right", playlistWrapperRef)}
      className=" absolute z-20 right-0 top-[40%]"
    >
      <IconWrapper
        size="medium"
        className="text-foreground/70 bg-surface-1 hover:bg-surface-2 hover:translate-x-1 transition-transform duration-200 rounded-full size-14 hover:text-foreground"
        Icon={ChevronRight}
      />
    </button>
  );
}

export default ScrollRightButton;
