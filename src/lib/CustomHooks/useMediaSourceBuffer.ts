import { useEffect, useRef } from "react";
import { fetchSegment } from "../MediaSource/fetchSegment";
import { getRemainingBufferDuration } from "../MediaSource/getRemainBuffer";
import { useRepeatAndCurrentPlayList } from "../zustand";
import throttle from "../throttle";
import { fetchInitSegment } from "../MediaSource/fetchInitSegment";
import { hlsDirectPlay } from "../HlsDirectPlay";
import { useAudioElementContext } from "@/Context/ContextAudioWrapper";
const bufferThreshold = 10;
const mimeType_audio = "audio/mp4";
const codecs_audio = "mp4a.40.2";
const mimeCodec_audio = `${mimeType_audio};codecs="${codecs_audio}"`;
export interface FetchingState {
  isFetch: boolean;
  fetchingseg: number;
}

// this function check whether media source is supported or not first , then check whether native hls is supported or not
export function shouldUseNativeHLS() {
  if (typeof window === "undefined") return false;

  if (window.MediaSource) {
    return false;
  }

  const audio = document.createElement("audio");
  const isNativeCapable =
    audio.canPlayType("application/vnd.apple.mpegurl") !== "" ||
    audio.canPlayType("audio/mpegurl") !== "";

  return isNativeCapable;
}

const useMediaSourceBuffer = (
  url: string,
  sege: number,
  song_time_stamp: Array<number>,
  id: string,
) => {
  const { audioElRef } = useAudioElementContext();
  const fetchingRef = useRef<FetchingState>({
    isFetch: false,
    fetchingseg: 1,
  });
  const loadNextSegmentRef = useRef<() => Promise<void>>(null);
  const prefetchPromiseRef = useRef<Promise<
    [ArrayBuffer, ArrayBuffer] | null
  > | null>(null);

  const segNumRef = useRef(1);
  const mediaSourceRef = useRef<MediaSource | null>(null);
  const sourceBufferRef = useRef<SourceBuffer | null>(null);
  const prefetchedUrlRef = useRef("");
  const abortControllerRef = useRef<AbortController | null>(null);
  const initAbortControllerRef = useRef<AbortController | null>(null);
  const isCalledRef = useRef(false);
  const isCalledPrefetchRef = useRef(false);

  const prefetchSegment = useRepeatAndCurrentPlayList(
    (state) => state.prefetchSegment,
  );

  useEffect(() => {
    if (!url) return;
    if (shouldUseNativeHLS()) {
      hlsDirectPlay(url, audioElRef);
      return;
    }
    if (!window.MediaSource) return;

    if (url !== prefetchedUrlRef.current) {
      prefetchPromiseRef.current = null;
    }
    const checkFeching = async () => {
      return prefetchSegment({
        id,
        abortController: abortControllerRef,
        prefetchedUrl: prefetchedUrlRef,
        prefetchPromiseRef,
      });
    };

    const fetchAudioSegment = async (Num: number) => {
      if (abortControllerRef.current === null) {
        return;
      }

      if (
        url === prefetchedUrlRef.current &&
        Num === 1 &&
        prefetchPromiseRef.current
      ) {
        if (
          sourceBufferRef.current?.buffered &&
          !sourceBufferRef.current.updating &&
          mediaSourceRef.current?.readyState
        ) {
          const data = await checkFeching();
          if (!data) return;
          sourceBufferRef.current!.appendBuffer(data[1]);
          prefetchPromiseRef.current = null;

          fetchingRef.current.isFetch = false;
          segNumRef.current++;
        }
      } else {
        await fetchSegment(
          url,
          sourceBufferRef,
          mediaSourceRef,
          Num,
          abortControllerRef,
          segNumRef,
          fetchingRef,
        );
      }
    };

    const loadNextSegment = async () => {
      const { remainingBuffer, segData } = getRemainingBufferDuration(
        audioElRef,
        song_time_stamp,
      );

      if (
        segNumRef.current > sege &&
        mediaSourceRef.current?.readyState === "open" &&
        isCalledRef.current
      ) {
        mediaSourceRef.current!.endOfStream();
        isCalledRef.current = false;
      }

      if (
        segNumRef.current > sege &&
        isCalledPrefetchRef.current &&
        !prefetchPromiseRef.current
      ) {
        checkFeching();
        isCalledPrefetchRef.current = false;
      }

      if (
        segNumRef.current < sege &&
        !isCalledRef.current &&
        sourceBufferRef.current?.buffered &&
        !sourceBufferRef.current.updating
      ) {
        isCalledRef.current = true;
        isCalledPrefetchRef.current = true;
      }

      if (
        !fetchingRef.current.isFetch &&
        bufferThreshold > remainingBuffer &&
        segNumRef.current <= sege
      ) {
        fetchingRef.current.isFetch = true;
        fetchingRef.current.fetchingseg = segNumRef.current;
        await fetchAudioSegment(segNumRef.current);
      } else if (bufferThreshold < remainingBuffer) {
        segNumRef.current = segData;
      }
    };
    loadNextSegmentRef.current = loadNextSegment;
    const throttleLoadNextSegment = throttle(loadNextSegment, 1000);

    const updateendLoadNextSegment = () => {
      if (segNumRef.current <= sege) {
        loadNextSegment();
      }

      if (
        segNumRef.current > sege &&
        mediaSourceRef.current?.readyState === "open"
      ) {
        mediaSourceRef.current!.endOfStream();
        isCalledRef.current = false;
      }
    };

    const sourceOpen = async () => {
      if (!mediaSourceRef.current) return;
      if (sourceBufferRef.current === null) {
        sourceBufferRef.current =
          mediaSourceRef.current.addSourceBuffer(mimeCodec_audio);
        if (url === prefetchedUrlRef.current && prefetchPromiseRef.current) {
          if (
            sourceBufferRef.current?.buffered &&
            !sourceBufferRef.current.updating &&
            mediaSourceRef.current?.readyState
          ) {
            const data = await checkFeching();
            if (!data) return;
            sourceBufferRef.current.appendBuffer(data[0]);
          }
        } else {
          await fetchInitSegment(
            url,
            sourceBufferRef,
            mediaSourceRef,
            fetchingRef,
            segNumRef,
            abortControllerRef,
            initAbortControllerRef,
          );
        }
        if (!sourceBufferRef.current) return;
        sourceBufferRef.current.addEventListener(
          "updateend",
          updateendLoadNextSegment,
        );
        if (!audioElRef.current) return;
        audioElRef.current.addEventListener(
          "timeupdate",
          throttleLoadNextSegment,
        );
      }
    };

    const clearUpPreviousSong = () => {
      const audio = audioElRef.current;
      if (audio) {
        audio.pause();
        audio.src = "";
        audio.removeEventListener("timeupdate", throttleLoadNextSegment);
      }

      if (sourceBufferRef.current) {
        sourceBufferRef.current.removeEventListener(
          "updateend",
          updateendLoadNextSegment,
        );
        sourceBufferRef.current = null;
      }

      if (mediaSourceRef.current) {
        if (mediaSourceRef.current.readyState === "open") {
          try {
            mediaSourceRef.current.endOfStream();
          } catch {}
        }
        mediaSourceRef.current.removeEventListener("sourceopen", sourceOpen);
        mediaSourceRef.current = null;
      }

      abortControllerRef.current?.abort("change song");
      abortControllerRef.current = null;

      initAbortControllerRef.current?.abort("change song");
      initAbortControllerRef.current = null;

      segNumRef.current = 1;
    };

    const startUp = () => {
      if (!audioElRef.current) return;
      if (!mediaSourceRef.current) return;
      audioElRef.current.src = URL.createObjectURL(mediaSourceRef.current);
      mediaSourceRef.current.addEventListener("sourceopen", sourceOpen, false);
    };
    mediaSourceRef.current = new MediaSource();
    startUp();

    abortControllerRef.current = new AbortController();
    initAbortControllerRef.current = new AbortController();

    return () => {
      clearUpPreviousSong();
    };
  }, [url, id, audioElRef, prefetchSegment, song_time_stamp, sege]);

  return {
    segNum: segNumRef,
    loadNextSegment: loadNextSegmentRef,
    fetching: fetchingRef,
    abortController: abortControllerRef,
    bufferThreshold,
  };
};

export default useMediaSourceBuffer;
