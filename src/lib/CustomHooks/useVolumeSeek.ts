import { RefObject, useContext, useEffect } from "react";
import { sliderPositionCal } from "../MediaSource/SliderPositionCal";
import {
  useVolumeDragging,
  useVolumeValue,
  VolumeDraggingActions,
  VolumeDraggingState,
  VolumeValueActions,
  VolumeValueState,
} from "../zustand";
import { AudioElementContext } from "@/ui/Footer/audio/AudioWrapper";

interface audioSeekProp {
  sliderRef: RefObject<HTMLDivElement | null>;
  isPointer: boolean;
  isTouchDevice: boolean;
  shouldRun: boolean;
}
interface useAudioSeekReturnType {
  value: VolumeValueState["value"];
  setValue: VolumeValueActions["setValue"];
  isDragging: VolumeDraggingState["isDragging"];
  setIsDragging: VolumeDraggingActions["setIsDragging"];
}

const useVolumeSeek = ({
  sliderRef,
  isPointer,
  isTouchDevice,
  shouldRun,
}: audioSeekProp): useAudioSeekReturnType => {
  const { audioElRef } = useContext(AudioElementContext);
  const value = useVolumeValue((state: VolumeValueState) => state.value);
  const setValue = useVolumeValue(
    (state: VolumeValueActions) => state.setValue,
  );
  const isDragging = useVolumeDragging(
    (state: VolumeDraggingState) => state.isDragging,
  );
  const setIsDragging = useVolumeDragging(
    (state: VolumeDraggingActions) => state.setIsDragging,
  );
  useEffect(() => {
    const copyAudioRef = audioElRef.current;
    function handleMove(e: PointerEvent | TouchEvent | MouseEvent) {
      if (!copyAudioRef) return;
      if (!shouldRun) return;
      const { percentage, seekCalReturn } = sliderPositionCal({
        sliderRef,
        e,
      });
      copyAudioRef.volume = seekCalReturn;
      setValue(percentage);
    }
    function handleUp() {
      if (!shouldRun) return;
      setIsDragging(false);
    }

    if (isDragging) {
      if (isPointer) {
        document.addEventListener("pointermove", handleMove);
        document.addEventListener("pointerup", handleUp);
      } else {
        if (isTouchDevice) {
          document.addEventListener("touchmove", handleMove);
          document.addEventListener("touchend", handleUp);
        } else {
          document.addEventListener("mousemove", handleMove);
          document.addEventListener("mouseup", handleUp);
        }
      }
    }

    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleUp);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };
  }, [
    isDragging,
    sliderRef,
    isPointer,
    isTouchDevice,
    setValue,
    setIsDragging,
    shouldRun,
    audioElRef,
  ]);

  return { value, setValue, isDragging, setIsDragging };
};
export default useVolumeSeek;
