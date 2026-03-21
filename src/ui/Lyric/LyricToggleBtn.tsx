"use client";

import { ShowBlockAction, useShowBlock } from "@/lib/zustand";
import IconWrapper from "@/ui/general/IconWrapper";
import { SquareChartGantt } from "lucide-react";

function LyricToggleBtn() {
  const setShowBlock = useShowBlock(
    (state: ShowBlockAction) => state.setShowBlock,
  );
  return (
    <button
      className=""
      onClick={() => {
        setShowBlock("lyric");
      }}
    >
      <IconWrapper Icon={SquareChartGantt} size="large" />
    </button>
  );
}

export default LyricToggleBtn;
