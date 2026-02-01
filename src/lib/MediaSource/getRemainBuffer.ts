import { RefObject } from "react";
const EPSILON = 1;

function binarySearchWithTolerance(
  arr: number[],
  target: number,
  epsilon: number,
): number {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const diff = arr[mid] - target;
    if (Math.abs(diff) < epsilon) {
      return mid;
    } else if (diff < 0) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}
export function getRemainingBufferDuration(
  audioElRef: RefObject<HTMLAudioElement | null>,
  song_time_stamp: number[],
) {
  const audio = audioElRef.current;
  if (!audio) return { remainingBuffer: 0, segData: -1 };

  const buffered = audio.buffered;
  const currentTime = audio.currentTime;

  for (let i = 0; i < buffered.length; i++) {
    const start = buffered.start(i);
    const end = buffered.end(i);
    if (currentTime >= start && currentTime <= end) {
      const data = binarySearchWithTolerance(song_time_stamp, end, EPSILON);

      // data+2 means already loaded buffer + next unloaded segement
      //data + 1 means already loaded buffer
      const remainingBuffer = end - currentTime;
      const segData = data + 2;

      return { remainingBuffer, segData };
    }
  }

  return { remainingBuffer: 0, segData: -1 };
}
