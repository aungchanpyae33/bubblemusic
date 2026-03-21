"use client";

import { ShowBlockAction, useShowBlock } from "@/lib/zustand";
import IconWrapper from "@/ui/general/IconWrapper";
import { Logs } from "lucide-react";

function QueueToggle() {
  const setShowBlock = useShowBlock(
    (state: ShowBlockAction) => state.setShowBlock,
  );
  return (
    <button
      className=""
      onClick={() => {
        setShowBlock("queue");
      }}
    >
      <IconWrapper Icon={Logs} size="large" />
    </button>
  );
}

export default QueueToggle;
