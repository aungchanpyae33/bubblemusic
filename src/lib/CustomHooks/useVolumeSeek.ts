import { RefObject, useEffect } from "react";
import { sliderPositionCal } from "../MediaSource/SliderPositionCal";
import {
  useVolumeDragging,
  useVolumeValue,
  VolumeDraggingActions,
  VolumeDraggingState,
  VolumeValueActions,
  VolumeValueState,
} from "../zustand";
import { useAudioElementContext } from "@/Context/ContextAudioWrapper";

interface audioSeekProp {
  sliderRef: RefObject<HTMLDivElement | null>;
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
  shouldRun,
}: audioSeekProp): useAudioSeekReturnType => {
  const { audioElRef } = useAudioElementContext();
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
    function handleMove(e: PointerEvent) {
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
      document.body.addEventListener("pointermove", handleMove);
      document.body.addEventListener("pointerup", handleUp);
    }

    return () => {
      document.body.removeEventListener("pointermove", handleMove);
      document.body.removeEventListener("pointerup", handleUp);
    };
  }, [isDragging, sliderRef, setValue, setIsDragging, shouldRun, audioElRef]);

  return { value, setValue, isDragging, setIsDragging };
};
export default useVolumeSeek;
