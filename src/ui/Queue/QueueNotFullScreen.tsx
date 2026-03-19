"use client";
import { ReactNode } from "react";

function QueueNotFullScreen({ children }: { children: ReactNode }) {
  return (
    <div className="h-full will-change-scroll   w-[20%] md:w-[25%] bg-section min-w-[250px] flex relative   max-w-[375px] overflow-hidden">
      {children}
    </div>
  );
}

export default QueueNotFullScreen;
