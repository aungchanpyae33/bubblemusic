import { VolumeDraggingActions, VolumeValueActions } from "@/lib/zustand";
import React, { useContext } from "react";
import { AudioElementContext } from "../audio/AudioWrapper";

interface Props extends React.ComponentProps<"div"> {
  setIsDragging: VolumeDraggingActions["setIsDragging"];
  sliderRef: React.RefObject<HTMLDivElement | null>;
  setValue: VolumeValueActions["setValue"];
  value: number;
  children: React.ReactNode;
}
function VolumeSlider({
  setIsDragging,
  sliderRef,
  setValue,
  value,
  children,
  className,
}: Props) {
  const { audioElRef } = useContext(AudioElementContext);
  return (
    <div
      className={className}
      tabIndex={0}
      onKeyDown={(e) => {
        const audioEl = audioElRef.current;
        if (!audioEl) return;
        if (e.key === "ArrowRight") {
          if (!sliderRef.current) return;
          setIsDragging(true);
          const newValue = Math.max(value - 1, 0);
          const volValue = 1 - newValue / 100;
          audioEl.volume = volValue;
          setValue(newValue);
        } else if (e.key === "ArrowLeft") {
          if (!sliderRef.current) return;
          setIsDragging(true);
          const newValue = Math.min(value + 1, 100);
          const volValue = 1 - newValue / 100;
          audioEl.volume = volValue;
          setValue(newValue);
        } else if (e.key !== "Tab") {
          e.preventDefault();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          setIsDragging(false);
        } else if (e.key !== "Tab") {
          e.preventDefault();
        }
      }}
    >
      {children}
    </div>
  );
}

export default VolumeSlider;
