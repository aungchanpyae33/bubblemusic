import { sliderPositionCal } from "@/lib/MediaSource/SliderPositionCal";
import { VolumeDraggingActions, VolumeValueActions } from "@/lib/zustand";
import { RefObject, useContext } from "react";
import { AudioElementContext } from "../audio/AudioWrapper";

function VolumeSliderActionWrapper({
  sliderRef,
  isPointer,
  isTouchDevice,
  setIsDragging,
  setValue,
  children,
}: {
  sliderRef: RefObject<HTMLDivElement | null>;
  isPointer: boolean;
  isTouchDevice: boolean;
  setIsDragging: VolumeDraggingActions["setIsDragging"];
  setValue: VolumeValueActions["setValue"];
  children: React.ReactNode;
}) {
  const { audioElRef } = useContext(AudioElementContext);
  return (
    <div
      className="flex-1 h-full group flex items-center justify-center cursor-pointer touch-none "
      ref={sliderRef}
      {...(isPointer
        ? {
            onPointerDown: (e) => {
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
            },
          }
        : isTouchDevice
          ? {
              onTouchStart: (e) => {
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
              },
            }
          : {
              onMouseDown: (e) => {
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
              },
            })}
    >
      {children}
    </div>
  );
}

export default VolumeSliderActionWrapper;
