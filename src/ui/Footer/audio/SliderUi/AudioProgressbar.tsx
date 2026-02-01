import type { valueProps } from "@/lib/CustomHooks/useAudioSeek";
import { RefObject } from "react";

function AudioProgressbar({
  value,
  progressRef,
}: {
  value: valueProps["value"];
  progressRef: RefObject<HTMLDivElement | null>;
}) {
  const output = 100 - value!;
  return (
    <div
      className="bg-white w-full left-0  absolute top-0 origin-left h-full"
      style={{
        transform: `scaleX(${output}%)`,
      }}
      ref={progressRef}
    ></div>
  );
}

export default AudioProgressbar;
