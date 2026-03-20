import { RefObject } from "react";
import type { FetchingState } from "../CustomHooks/useMediaSourceBuffer";

export const fetchInitSegment = async (
  url: string,
  sourceBuffer: RefObject<SourceBuffer | null>,
  mediaSource: RefObject<MediaSource | null>,
  fetching: RefObject<FetchingState>,
  segNum: RefObject<number>,
  abortController: RefObject<AbortController | null>,
  initAbortController: RefObject<AbortController | null>,
) => {
  const fetchInitOptions: RequestInit = {
    signal: initAbortController!.current!.signal,
  };
  const fetchOptions: RequestInit = {
    signal: abortController!.current!.signal,
  };
  const initUrl = url;
  const seg1Url = url.replace("init.mp4", "seg-1.m4s");

  try {
    fetching.current.isFetch = true;
    //.all will throw all response if one is fail to fech
    const responses = await Promise.allSettled([
      fetch(initUrl, fetchInitOptions).then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch init segment: ${res.statusText}`);
        }
        return res.arrayBuffer();
      }),
      fetch(seg1Url, fetchOptions).then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch seg-1 segment: ${res.statusText}`);
        }
        return res.arrayBuffer();
      }),
    ]);

    // Extract successful responses
    const initSegment =
      responses[0].status === "fulfilled" ? responses[0].value : null;
    const seg1Segment =
      responses[1].status === "fulfilled" ? responses[1].value : null;

    if (initSegment) {
      await appendBufferFn(
        sourceBuffer,
        mediaSource,
        fetching,
        segNum,
        initSegment,
        true,
      );
      console.warn("Init segment appended");
    }

    if (seg1Segment) {
      await appendBufferFn(
        sourceBuffer,
        mediaSource,
        fetching,
        segNum,
        seg1Segment,
        false,
      );
    }

    return responses;
  } catch (err) {
    const error = err as Error;
    if (error.name === "AbortError") {
      console.log(`The song init fetching was aborted`);
    } else {
      console.log(`Error fetching init:`, err);
    }
  }
};

const appendBufferFn = (
  sourceBuffer: RefObject<SourceBuffer | null>,
  mediaSource: RefObject<MediaSource | null>,
  fetching: RefObject<FetchingState>,
  segNum: RefObject<number>,
  buffer: ArrayBuffer,
  isInit: boolean,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      if (
        sourceBuffer.current?.buffered &&
        !sourceBuffer.current.updating &&
        mediaSource.current?.readyState === "open"
      ) {
        // need to listen updateend to make resolve only updating is done , without this , next appenbufferfan updating state is always false
        const onUpdateEnd = () => {
          // Clean up the listener after it runs.
          if (sourceBuffer.current) {
            sourceBuffer.current.removeEventListener("updateend", onUpdateEnd);
          }
          // When appending segments (non-init), increase segNum.
          if (!isInit) {
            segNum.current++;
          }
          fetching.current.isFetch = false;
          resolve();
        };

        sourceBuffer.current.addEventListener("updateend", onUpdateEnd);
        sourceBuffer.current.appendBuffer(buffer);
      } else {
        // reject(
        //   new Error("SourceBuffer or MediaSource not available or not open")
        // );
      }
    } catch (error) {
      reject(error);
    }
  });
};
