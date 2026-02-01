import { RefObject } from "react";
import { playBackRate } from "./playBackRate";
import AbortFetch from "./AbortFetch";
interface AudioSeekedProp {
  per: number;
  duration: number;
  audioElRef: RefObject<HTMLAudioElement | null>;
  segNum: RefObject<number>;
  sege: number | undefined;
  loadNextSegment: React.RefObject<(() => Promise<void>) | null>;
  bufferThreshold: number;
  abortController: RefObject<AbortController | null>;
  fetching: RefObject<{ isFetch: boolean; fetchingseg: number }>;
  song_time_stamp: Array<number>;
}
const AudioSeeked = ({
  per,
  duration,
  audioElRef,
  sege,
  segNum,
  loadNextSegment,
  bufferThreshold,
  fetching,
  abortController,
  song_time_stamp,
}: AudioSeekedProp) => {
  const data = per * duration;
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
    // segments are start with 1 , change to 1 if 0
    segNum.current = seekSeg === 0 ? 1 : seekSeg;

    if (loadNextSegment.current) loadNextSegment.current();
  }
};
export default AudioSeeked;
