import { RefObject } from "react";
import type { FetchingState } from "../CustomHooks/useMediaSourceBuffer";

export const fetchSegment = async (
  url: string,
  sourceBuffer: RefObject<SourceBuffer | null>,
  mediaSource: RefObject<MediaSource | null>,
  Num: number,
  abortController: RefObject<AbortController | null>,
  segNum: RefObject<number>,
  fetching: RefObject<FetchingState>,
) => {
  const fetchOptions: RequestInit = {
    signal: abortController!.current!.signal,
  };

  const outputUrl = url.replace("init.mp4", `seg-${Num}.m4s`);

  try {
    const response = await fetch(outputUrl, fetchOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch the song segment seg-${Num}`);
    }
    const buf = await response.arrayBuffer();
    if (
      sourceBuffer.current?.buffered &&
      !sourceBuffer.current.updating &&
      mediaSource.current?.readyState
    ) {
      sourceBuffer.current!.appendBuffer(buf);
      segNum.current++;
      fetching.current.isFetch = false;
    }

    return buf;
  } catch (err) {
    const error = err as Error;
    if (error.name === "AbortError") {
      console.log(`The song segment seg-${Num} fetching was aborted`);
    } else {
      console.log(`Error fetching segment seg-${Num}:`, err);
    }
  }
};
