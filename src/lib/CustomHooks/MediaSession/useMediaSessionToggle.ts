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
    if (navigator.mediaSession && window.MediaMetadata) {
      try {
        const handleMediaSession = () => {
          setPlay("toggle_key", undefined);
          setPlayList("toggle_key", undefined);
        };
        navigator.mediaSession.setActionHandler("play", handleMediaSession);
        navigator.mediaSession.setActionHandler("pause", handleMediaSession);
      } catch {}
    }

    return () => {
      if (navigator.mediaSession) {
        try {
          navigator.mediaSession.setActionHandler("play", null);
          navigator.mediaSession.setActionHandler("pause", null);
        } catch {}
      }
    };
  }, [setPlay, setPlayList]);
};
export default useMediaSessionToggle;
