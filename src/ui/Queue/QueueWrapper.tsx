"use client";
import ContextContainerHeight from "@/Context/ContextContainerHeight";
import useScreenSize from "@/lib/CustomHooks/useScreenSizeDetecter";
import { queueState, queueStateAction, useOnlyOneSider } from "@/lib/zustand";
import { useEffect, useRef } from "react";

function QueueWrapper({ children }: { children: React.ReactNode }) {
  const isQueue = useOnlyOneSider((state: queueState) => state.isQueue);
  const setIsQueue = useOnlyOneSider(
    (state: queueStateAction) => state.setIsQueue,
  );
  const containerHeightRef = useRef<HTMLDivElement>(null);
  const isSmall = useScreenSize("(width >= 48rem)");
  useEffect(() => {
    if (isQueue) {
      setIsQueue(isSmall);
    }
  }, [isSmall, setIsQueue, isQueue]);
  return (
    <div className="h-full" ref={containerHeightRef}>
      <ContextContainerHeight containerHeightRef={containerHeightRef}>
        {isQueue && children}
      </ContextContainerHeight>
    </div>
  );
}

export default QueueWrapper;
