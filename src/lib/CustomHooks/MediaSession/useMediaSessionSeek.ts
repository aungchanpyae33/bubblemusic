import { useEffect } from "react";
import { useAudioElementContext } from "@/Context/ContextAudioWrapper";
import { safeAudioPlay } from "@/lib/safeAudioPlay";

const useMediaSessionSeek = (duration: number) => {
  const { audioElRef } = useAudioElementContext();

  useEffect(() => {
    if (navigator.mediaSession && window.MediaMetadata) {
      try {
        navigator.mediaSession.setActionHandler("seekto", (details) => {
          const data = details.seekTime;
          if (!audioElRef.current || data === undefined) return;
          audioElRef.current.currentTime = data;
          safeAudioPlay(audioElRef.current);
        });
      } catch {}
    }
    return () => {
      if (navigator.mediaSession) {
        try {
          navigator.mediaSession.setActionHandler("seekto", null);
        } catch {}
      }
    };
  }, [duration, audioElRef]);
};

export default useMediaSessionSeek;
