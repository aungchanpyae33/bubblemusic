import { useEffect, useRef } from "react";
import { useAudioElementContext } from "@/Context/ContextAudioWrapper";
import Hls from "hls.js";
import {
  currentSongPlaylistAction,
  DirectPlayBackAction,
  isFallBackAudioActions,
  noticeModalBoxAction,
  ShouldFetchSongsListIdAction,
  SongActions,
  SongFunctionActions,
  StorePlayListIdStateAction,
  useDirectPlayBack,
  useInstantFallBackAudioFull,
  useNoticeModalBox,
  useRepeatAndCurrentPlayList,
  useShouldFetchSongsList,
  useSong,
  useSongFunction,
  useStorePlayListId,
} from "../zustand";
import { useTranslations } from "next-intl";

const useMediaSourceBuffer = (url: string) => {
  const w = useTranslations("Warning");
  const setPlaylistId = useStorePlayListId(
    (state: StorePlayListIdStateAction) => state.setPlaylistId,
  );

  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay,
  );
  const setPlayListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylistAction) => state.setPlayListArray,
  );
  const FetchSongsListIdAction = useShouldFetchSongsList(
    (state: ShouldFetchSongsListIdAction) => state.FetchSongsListIdAction,
  );
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList,
  );
  const setIsFallBackAudio = useInstantFallBackAudioFull(
    (state: isFallBackAudioActions) => state.setIsFallBackAudio,
  );
  const { audioElRef } = useAudioElementContext();
  const mainHlsInstance = useRef<Hls | null>(null);
  const noticeModalBoxAction = useNoticeModalBox(
    (state: noticeModalBoxAction) => state.noticeModalBoxAction,
  );
  useEffect(() => {
    const audio = audioElRef.current;
    if (!audio) return;
    const src = url;
    if (!src) return;

    if (Hls.isSupported()) {
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
      return;
    } else {
      noticeModalBoxAction({
        noticeText: w("noHlsSupport"),
      });
      setPlayListArray({});
      setIsFallBackAudio(false);
      FetchSongsListIdAction(undefined);
      updateSongCu({});
      setPlaylistId({});
      setPlayList("close", undefined);
      setPlay("close", undefined);
    }

    return () => {
      mainHlsInstance.current?.destroy();
      mainHlsInstance.current = null;
    };
  }, [
    FetchSongsListIdAction,
    audioElRef,
    noticeModalBoxAction,
    setIsFallBackAudio,
    setPlay,
    setPlayList,
    setPlayListArray,
    setPlaylistId,
    updateSongCu,
    url,
    w,
  ]);
};

export default useMediaSourceBuffer;
