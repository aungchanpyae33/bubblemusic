import { useEffect } from "react";
import { useAudioElementContext } from "@/Context/ContextAudioWrapper";
import { safeAudioPlay } from "@/lib/safeAudioPlay";

const useMediaSessionSeek = (duration: number) => {
  const { audioElRef } = useAudioElementContext();

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        const data = details.seekTime;
        if (!audioElRef.current || data === undefined) return;
        audioElRef.current.currentTime = data;
        safeAudioPlay(audioElRef.current);
      });
    }
    return () => {
      navigator.mediaSession.setActionHandler("seekto", null);
    };
  }, [duration, audioElRef]);
};

export default useMediaSessionSeek;
