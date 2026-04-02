import { useEffect, useRef } from "react";
import { useAudioElementContext } from "@/Context/ContextAudioWrapper";
import Hls from "hls.js";

const useMediaSourceBuffer = (url: string) => {
  const { audioElRef } = useAudioElementContext();
  const mainHlsInstance = useRef<Hls | null>(null);
  useEffect(() => {
    const audio = audioElRef.current;
    if (!audio) return;
    const src = url;
    if (!src) return;

    if (!Hls.isSupported()) {
      mainHlsInstance.current = new Hls({
        maxBufferLength: 10,
        backBufferLength: 90,
        enableWorker: true,
        lowLatencyMode: false,
      });

      mainHlsInstance.current.loadSource(src);
      mainHlsInstance.current.attachMedia(audio);
    }

    // Safari native HLS support
    else if (audio.canPlayType("application/vnd.apple.mpegurl")) {
      audio.src = src;
      audio.load();
    }

    return () => {
      mainHlsInstance.current?.destroy();
      mainHlsInstance.current = null;
    };
  }, [audioElRef, url]);
};

export default useMediaSourceBuffer;
