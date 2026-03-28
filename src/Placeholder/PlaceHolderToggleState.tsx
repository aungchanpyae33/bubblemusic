import {
  currentSongPlaylist,
  DirectPlayBackAction,
  IsRepeatState,
  SetListTrackAction,
  SetSongTrackAction,
  SongActions,
  SongDetail,
  SongFunctionActions,
  SongFunctionState,
  SongState,
  StorePlayListIdState,
  StorePlayListIdStateAction,
  useDirectPlayBack,
  useListTrack,
  useRepeatAndCurrentPlayList,
  useSong,
  useSongFunction,
  useSongTrack,
  useStorePlayListId,
} from "@/lib/zustand";
import { useEffect, useRef } from "react";
import { addRecentlyPlayedList } from "@/actions/addRecentPlayedList";
import { addRecentlySong } from "@/actions/addRecentSong";
import { useQueryClient } from "@tanstack/react-query";
import outputCurrentIndex from "@/lib/OutputCurrentIndex";
import type { ListSongPage } from "@/database/data-types-return";
import { useDataContext } from "@/Context/ContextMedia";
import { useAudioElementContext } from "@/Context/ContextAudioWrapper";

function PlaceHolderToggleState({
  url,
  id,
  children,
}: {
  url: string;
  id: string;
  children: React.ReactNode;
}) {
  const setTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const setTimeoutRefForList = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const { segNum } = useDataContext();
  const { audioElRef } = useAudioElementContext();
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) =>
      Object.values(state.playListArray)[0] || undefined,
  ) as ListSongPage;
  const Isplay = useSongFunction(
    (state: SongFunctionState) => Object.values(state.Isplay)[0],
  );
  const { song_id } = useSong((state: SongState) => state.songCu) as SongDetail;

  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) => Object.values(state.playlistId)[0] || [],
  ) as string[];
  const { id: list_id, type, flag } = playListArray;
  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay,
  );
  const setListTrack = useListTrack(
    (state: SetListTrackAction) => state.setListTrack,
  );
  const setPlaylistId = useStorePlayListId(
    (state: StorePlayListIdStateAction) => state.setPlaylistId,
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList,
  );
  const setSongTrack = useSongTrack(
    (state: SetSongTrackAction) => state.setSongTrack,
  );
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);
  const isRepeat = useRepeatAndCurrentPlayList(
    (state: IsRepeatState) => state.isRepeat,
  );
  const queryClient = useQueryClient();
  useEffect(() => {
    const copyAudioRef = audioElRef.current;
    if (!copyAudioRef) return;
    function handlePlay() {
      if (!copyAudioRef) return;
      if (copyAudioRef.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        if (Isplay) {
          if (copyAudioRef.paused) {
            copyAudioRef.play();
          }
        } else {
          if (!copyAudioRef.paused) {
            copyAudioRef.pause();
          }
        }
      }
    }

    function playNext() {
      if (!copyAudioRef) return;
      if (isRepeat) {
        copyAudioRef.currentTime = 0;
        segNum.current = 1;
        copyAudioRef.play();
        return;
      }
      if (
        !playListArray ||
        !playListArray.songs ||
        playListArray.songs.idArray.length === 0
      )
        return;

      const currentIndex = Math.min(
        outputCurrentIndex(playListArray.songs.idArray, id),
        playListArray.songs.idArray.length - 1,
      );
      const nextIndex = Math.min(
        currentIndex + 1,
        playListArray.songs.idArray.length - 1,
      );
      if (!isRepeat) {
        const songList = playListArray.songs;
        const {
          url,
          sege,
          duration,
          name,
          song_time_stamp,
          id,
          song_id,

          artists,
          is_lyric,
          cover_url,
        } = songList.byId[playListArray.songs.idArray[nextIndex]];
        const uniUrl = id;
        if (
          currentIndex >= playListArray.songs.idArray.length - 1 &&
          uniUrl === id
        ) {
          setPlay("toggle_key", undefined);
          setPlayList("toggle_key", undefined);
          return;
        }
        updateSongCu({
          [uniUrl || ""]: url,
          sege,
          duration,
          name,
          song_time_stamp,
          id,
          song_id,

          artists,
          is_lyric,
          cover_url,
        });
        // [todo] need to check if there is a new playlist or not
        setPlaylistId({
          [playlistId[0] || ""]: [playlistId[0], id],
        });
        setPlay(uniUrl, true);
        // [todo] need to check if there is a new playlist or not
        setPlayList(playlistId[0], true);
      }
    }

    handlePlay();
    copyAudioRef.addEventListener("ended", playNext);
    return () => {
      copyAudioRef.removeEventListener("ended", playNext);
    };
  }, [
    Isplay,
    setPlay,
    updateSongCu,
    isRepeat,
    segNum,
    setPlayList,
    playListArray,
    playlistId,
    url,
    id,
    setPlaylistId,
    audioElRef,
  ]);

  useEffect(() => {
    async function addRecentList() {
      if (list_id.startsWith("create-on-fly")) return;
      if (type === "track") return;
      if (flag && flag === "user-specific") return;
      const { data: recentList, error } = await addRecentlyPlayedList(
        list_id,
        type,
      );
      if (!recentList || error) return;
      queryClient.setQueryData(["recentlyPlayed"], recentList);
      //to prevent fast skip case
      if (setTimeoutRefForList.current) {
        clearTimeout(setTimeoutRefForList.current);
        setTimeoutRefForList.current = null;
        return;
      }

      setTimeoutRefForList.current = setTimeout(() => {
        if (setTimeoutRefForList.current) {
          setListTrack(type as "playlist" | "artist" | "album", list_id);
        }
      }, 60000);
    }
    addRecentList();
  }, [list_id, type, setListTrack, queryClient, flag]);
  //to prevent fast skipping song to add many times and user fast skip songs should not store in user perference
  useEffect(() => {
    function addRecentSong() {
      //to prevent fast skip case
      if (setTimeoutRef.current) {
        clearTimeout(setTimeoutRef.current);
        setTimeoutRef.current = null;
        return;
      }
      setTimeoutRef.current = setTimeout(async () => {
        if (setTimeoutRef.current) {
          await addRecentlySong(song_id);

          setSongTrack(song_id);
        }
      }, 10000);
    }
    addRecentSong();
  }, [song_id, setSongTrack]);

  return children;
}

export default PlaceHolderToggleState;
