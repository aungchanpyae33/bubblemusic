import {
  SongFunctionState,
  useSongFunction,
  useVolumeValue,
  VolumeValueState,
} from "@/lib/zustand";
import { useEffect } from "react";
import { safeAudioPlay } from "@/lib/safeAudioPlay";

function PlaceholderAudioHandler({
  audioElRef,
}: {
  audioElRef: React.RefObject<HTMLAudioElement | null>;
}) {
  const Isplay = useSongFunction(
    (state: SongFunctionState) =>
      Object.values(state.Isplay as Record<string, boolean>)[0],
  );
  const value = useVolumeValue((state: VolumeValueState) => state.value);

  useEffect(() => {
    const audioEl = audioElRef.current;
    if (!audioEl) return;

    function handleLoadedMetadata() {
      const audioEl = audioElRef.current;
      if (!audioEl) return;
      const defaultVol = 1 - value / 100;
      audioEl.volume = defaultVol;
      if (Isplay) {
        safeAudioPlay(audioEl);
      }
    }

    audioEl.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audioEl.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [Isplay, audioElRef, value]);

  return null;
}

export default PlaceholderAudioHandler;
