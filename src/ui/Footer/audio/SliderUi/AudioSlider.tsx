import type { valueProps } from "@/lib/CustomHooks/useAudioSeek";
import AudioSeeked from "@/lib/MediaSource/AudioSeeked";
import { DataContext } from "@/lib/MediaSource/ContextMedia";
import { AudioDraggingActions, AudioValueActions } from "@/lib/zustand";
import { ReactNode, RefObject, useContext } from "react";
import { AudioElementContext } from "../AudioWrapper";
interface Props extends React.ComponentProps<"div"> {
  sliderRef: RefObject<HTMLDivElement | null>;
  setIsDragging: AudioDraggingActions["setIsDragging"];
  duration: number;
  value: valueProps["value"];
  setValue: AudioValueActions["setValue"];
  progressRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}
function AudioSlider({
  sliderRef,
  setIsDragging,
  duration,
  value,
  setValue,
  progressRef,
  children,
  className,
}: Props) {
  const {
    loadNextSegment,
    segNum,
    sege,
    abortController,
    fetching,
    bufferThreshold,
    song_time_stamp,
  } = useContext(DataContext);
  const { audioElRef } = useContext(AudioElementContext);
  return (
    <div
      className={className}
      tabIndex={0}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          if (!sliderRef.current) return;
          setIsDragging(true);
          const newValue = Math.max(value! - 1, 0);
          setValue(newValue);
        } else if (e.key === "ArrowLeft") {
          if (!sliderRef.current) return;
          setIsDragging(true);
          const newValue = Math.min(value! + 1, 100);
          setValue(newValue);
        } else if (e.key !== "Tab") {
          e.preventDefault();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          setIsDragging(false);
          const offsetWidth =
            progressRef!.current!.getBoundingClientRect().width;
          const per = Math.min(
            Math.max(
              offsetWidth / sliderRef!.current!.getBoundingClientRect().width,
              0,
            ),
            1,
          );
          AudioSeeked({
            per,
            duration,
            audioElRef,
            sege,
            segNum,
            loadNextSegment,
            bufferThreshold,
            fetching,
            abortController,
            song_time_stamp,
          });
        } else if (e.key !== "Tab") {
          e.preventDefault();
        }
      }}
    >
      {children}
    </div>
  );
}

export default AudioSlider;
