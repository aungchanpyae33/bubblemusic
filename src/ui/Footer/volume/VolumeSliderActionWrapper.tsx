import { sliderPositionCal } from "@/lib/MediaSource/SliderPositionCal";
import { VolumeDraggingActions, VolumeValueActions } from "@/lib/zustand";
import { RefObject, useContext } from "react";
import { AudioElementContext } from "../audio/AudioWrapper";

function VolumeSliderActionWrapper({
  sliderRef,
  setIsDragging,
  setValue,
  children,
}: {
  sliderRef: RefObject<HTMLDivElement | null>;
  setIsDragging: VolumeDraggingActions["setIsDragging"];
  setValue: VolumeValueActions["setValue"];
  children: React.ReactNode;
}) {
  const { audioElRef } = useContext(AudioElementContext);
  return (
    <div
      className="flex-1 h-full group flex items-center justify-center cursor-pointer touch-none "
      ref={sliderRef}
      onPointerDown={(e) => {
        const audioEl = audioElRef.current;
        if (!audioEl) return;
        if (!sliderRef.current) return;
        setIsDragging(true);
        const { percentage, seekCalReturn } = sliderPositionCal({
          sliderRef,
          e,
        });
        audioEl.volume = seekCalReturn;
        setValue(percentage);
      }}
    >
      {children}
    </div>
  );
}

export default VolumeSliderActionWrapper;
