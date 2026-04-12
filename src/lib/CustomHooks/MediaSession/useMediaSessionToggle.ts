import { useEffect } from "react";
import { useDirectPlayBack, useSongFunction } from "../../zustand";
import type { DirectPlayBackAction, SongFunctionActions } from "../../zustand";
const useMediaSessionToggle = () => {
  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay,
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList,
  );
  useEffect(() => {
    if (!("mediaSession" in navigator)) return;

    const handleMediaSession = () => {
      setPlay("toggle_key", undefined);
      setPlayList("toggle_key", undefined);
    };
    navigator.mediaSession.setActionHandler("play", handleMediaSession);
    navigator.mediaSession.setActionHandler("pause", handleMediaSession);
    return () => {
      navigator.mediaSession.setActionHandler("play", null);
      navigator.mediaSession.setActionHandler("pause", null);
    };
  }, [setPlay, setPlayList]);
};
export default useMediaSessionToggle;
