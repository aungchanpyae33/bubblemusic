import { RefObject, useEffect } from "react";
import { playBackRate } from "../../MediaSource/playBackRate";
import AbortFetch from "../../MediaSource/AbortFetch";
import { useAudioElementContext } from "@/Context/ContextAudioWrapper";

const useMediaSessionSeek = (
  fetching: RefObject<{ isFetch: boolean; fetchingseg: number }>,
  abortController: RefObject<AbortController | null>,
  segNum: RefObject<number>,
  sege: number | undefined,
  loadNextSegment: React.RefObject<(() => Promise<void>) | null>,
  duration: number,
  bufferThreshold: number,
  song_time_stamp: Array<number>,
) => {
  const { audioElRef } = useAudioElementContext();
  // Extract the `value` from the event beforehand to avoid issues with `e` in dependencies

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        const data = +details.seekTime!;
        // Abort fetching if necessary

        // Use the extracted `data`
        const seekSeg = playBackRate({
          audioElRef,
          data,
          sege,
          duration,
          bufferThreshold,
          song_time_stamp,
        });
        if (!seekSeg) return;
        AbortFetch(fetching, abortController, seekSeg);
        if (seekSeg !== fetching.current.fetchingseg) {
          segNum.current = seekSeg;
          if (loadNextSegment.current) loadNextSegment.current();
        }
      });
    }
    return () => {
      navigator.mediaSession.setActionHandler("seekto", null);
    };
  }, [
    fetching,
    abortController,
    segNum,
    sege,
    loadNextSegment,
    duration,
    bufferThreshold,
    song_time_stamp,
    audioElRef,
  ]);
};

export default useMediaSessionSeek;
