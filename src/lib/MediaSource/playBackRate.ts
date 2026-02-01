import { RefObject } from "react";
import { getRemainingBufferDuration } from "./getRemainBuffer";

interface prop {
  audioElRef: RefObject<HTMLAudioElement | null>;
  data: number;
  sege: number | undefined;
  duration: number | undefined;
  bufferThreshold: number;
  song_time_stamp: Array<number>;
}

export function playBackRate({
  audioElRef,
  data,
  sege,
  duration,
  song_time_stamp,
  bufferThreshold,
}: prop) {
  if (!audioElRef.current) return;
  audioElRef.current.currentTime = data;
  const { remainingBuffer, segData } = getRemainingBufferDuration(
    audioElRef,
    song_time_stamp,
  );
  // console.log("10", remainingBuffer);
  //only return updated the segNum with conditional to prevent segment chagne to previous already loaded segment
  // if already buffered. return segData , if not return dataG by conditional check to make sure that no additional load on if there was already loaded buffer segments

  if (bufferThreshold < remainingBuffer) return segData;

  const audioPosition = Math.floor((data / duration!) * 100);

  // change to math.round to get data more precies
  // it can be greate if can fetch needed data it self (further) but it can not be fully accurate cuz all segemetns are not the same size

  let segPosition = Math.floor((sege! * audioPosition) / 100);
  for (
    let index = data;
    index > song_time_stamp[segPosition - 1];
    song_time_stamp[segPosition]
  ) {
    segPosition++;
  }
  // data+2 means already loaded buffer + next unloaded segement
  //data + 1 means already loaded buffer
  //  in this case SegeData -1 is equal to the segData + 1 which is data of the segments that has loaded buffer
  const datag = segPosition === segData - 1 ? segPosition + 1 : segPosition;
  // console.log(datag, "dataG");
  return datag;
}
