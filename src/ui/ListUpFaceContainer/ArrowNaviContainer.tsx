"use client";

import { useContainerContext } from "@/Context/ContextContainer";
import { ReactNode } from "react";

function ArrowNaviContainer({ children }: { children?: ReactNode }) {
  const { arrowNaviRef } = useContainerContext();
  return (
    <div
      className=" flex items-center text-sm text-ink-400 gap-1"
      ref={arrowNaviRef}
    >
      {children}
    </div>
  );
}

export default ArrowNaviContainer;
