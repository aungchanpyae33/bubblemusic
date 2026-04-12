import { RefObject, useEffect, useMemo } from "react";
import throttle from "../throttle";
import { seekCal, sliderPositionCal } from "../MediaSource/SliderPositionCal";
import AudioSeeked from "../MediaSource/AudioSeeked";
import {
  AudioDraggingActions,
  AudioDraggingState,
  AudioValueActions,
  AudioValueState,
  SongFunctionState,
  useAudioDragging,
  useAudioValue,
  useSongFunction,
} from "../zustand";
import { useAudioElementContext } from "@/Context/ContextAudioWrapper";
export interface valueProps {
  value: AudioValueState["value"] | undefined;
}
export interface isDraggingProps {
  isDragging: AudioDraggingState["isDragging"] | undefined;
}
interface audioSeekProp {
  sliderRef: RefObject<HTMLDivElement | null>;
  duration: number;
  url: string;
  shouldRun: boolean;
}
interface useAudioSeekReturnType {
  value: valueProps["value"];
  setValue: AudioValueActions["setValue"];
  isDragging: isDraggingProps["isDragging"];
  setIsDragging: AudioDraggingActions["setIsDragging"];
}

const useAudioSeek = ({
  sliderRef,
  duration,
  url,
  shouldRun,
}: audioSeekProp): useAudioSeekReturnType => {
  const value = useAudioValue((state: AudioValueState) =>
    shouldRun ? state.value : undefined,
  );
  const setValue = useAudioValue((state: AudioValueActions) => state.setValue);
  const isDragging = useAudioDragging((state: AudioDraggingState) =>
    shouldRun ? state.isDragging : undefined,
  );
  const setIsDragging = useAudioDragging(
    (state: AudioDraggingActions) => state.setIsDragging,
  );
  const throttledSetValue = useMemo(
    () => throttle((val: number) => setValue(val), 1000),
    [setValue],
  );
  const Isplay = useSongFunction(
    (state: SongFunctionState) =>
      Object.values(state.Isplay as Record<string, boolean>)[0],
  );
  const { audioElRef } = useAudioElementContext();

  useEffect(() => {
    const copyAudioRef = audioElRef.current;
    if (!copyAudioRef) return;
    let animationFrameId: number;

    function handleMove(e: PointerEvent) {
      if (!shouldRun) return;
      const { percentage } = sliderPositionCal({ sliderRef, e });
      setValue(percentage);
    }

    function handleUp(e: PointerEvent) {
      if (!shouldRun) return;

      setIsDragging(false);
      const per = seekCal({ sliderRef, e });

      AudioSeeked({
        per,
        duration,
        audioElRef,
      });
    }
    function update() {
      if (!Isplay || !shouldRun || !copyAudioRef || isDragging) {
        animationFrameId = requestAnimationFrame(update);
        return;
      }
      const data = (copyAudioRef.currentTime / copyAudioRef.duration) * 100;
      const newValue = 100 - data;
      throttledSetValue(newValue);
      animationFrameId = requestAnimationFrame(update);
    }

    if (isDragging) {
      document.body.addEventListener("pointermove", handleMove);
      document.body.addEventListener("pointerup", handleUp);
    }

    animationFrameId = requestAnimationFrame(update);

    return () => {
      document.body.removeEventListener("pointermove", handleMove);
      document.body.removeEventListener("pointerup", handleUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    duration,
    isDragging,
    sliderRef,
    setIsDragging,
    setValue,
    shouldRun,
    throttledSetValue,
    Isplay,
    audioElRef,
  ]);

  useEffect(() => {
    setValue(100);
  }, [url, setValue]);
  return { value, setValue, isDragging, setIsDragging };
};
export default useAudioSeek;
