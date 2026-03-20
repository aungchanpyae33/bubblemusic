"use client";
import {
  currentSongPlaylist,
  currentSongPlaylistAction,
  DirectPlayBackAction,
  DirectPlayBackState,
  isFallBackAudioActions,
  ShouldFetchSongsListIdAction,
  SongActions,
  SongFunctionActions,
  StorePlayListIdState,
  StorePlayListIdStateAction,
  useDirectPlayBack,
  useInstantFallBackAudioFull,
  useRepeatAndCurrentPlayList,
  useShouldFetchSongsList,
  useSong,
  useSongFunction,
  useStorePlayListId,
} from "@/lib/zustand";
import React, { RefObject, useRef } from "react";
import { Pause, Play } from "lucide-react";
import { getListDirectClient } from "@/database/client-data";
import type {
  ListSongPage,
  ListSongsReturn,
} from "@/database/data-types-return";
import TogglePlayButton from "../general/TogglePlayButton/TogglePlayButton";
import { MediaItemType } from "../../../database.types-fest";
import { audioPlayTriggerIos } from "@/lib/audioPlayTriggerIOS";
import { useAudioElementContext } from "../Footer/audio/AudioWrapper";
const hasData = async (
  dataFromFetch: RefObject<Promise<ListSongsReturn> | null>,
  listId: string,
  type: MediaItemType,
) => {
  if (!dataFromFetch.current) {
    dataFromFetch.current = getListDirectClient(listId, type);
  }
  return dataFromFetch.current;
};

interface DirectPlayButtonProps extends React.ComponentProps<"div"> {
  listId: string;
  type: MediaItemType;
}
function DirectPlayButton({ listId, type, className }: DirectPlayButtonProps) {
  const dataFromFetch = useRef<Promise<ListSongsReturn> | null>(null);

  // toggle playlistfolder
  const IsPlayList = useDirectPlayBack(
    (state: DirectPlayBackState) => state.IsPlayList[listId || ""],
  );

  // current playlist id and current song
  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) =>
      (state.playlistId as Record<string, Array<string>>)[listId || ""],
  );
  const playlist_songId = playlistId ? playlistId[1] : undefined;
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) =>
      (state.playListArray as Record<string, ListSongPage | undefined>)[listId],
  );

  const setPlaylistId = useStorePlayListId(
    (state: StorePlayListIdStateAction) => state.setPlaylistId,
  );

  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay,
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList,
  );
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);

  const setPlayListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylistAction) => state.setPlayListArray,
  );
  const FetchSongsListIdAction = useShouldFetchSongsList(
    (state: ShouldFetchSongsListIdAction) => state.FetchSongsListIdAction,
  );
  const setIsFallBackAudio = useInstantFallBackAudioFull(
    (state: isFallBackAudioActions) => state.setIsFallBackAudio,
  );
  const { audioElRef } = useAudioElementContext();
  async function getData() {
    const returnData = await hasData(dataFromFetch, listId, type);
    const { data, error } = returnData;

    if (error || !data) return;
    const { songs } = data;

    if (!songs || !songs.songs || songs.songs.idArray.length === 0) return;
    return songs;
  }
  const handlePlayClick = async () => {
    setIsFallBackAudio(); //fallback dynamic import
    //to reset auto fetch key after playing autogenerate playlist,
    FetchSongsListIdAction(undefined);

    // need to add before async fetch call as sadari will reject the trigger after awit fetch call
    audioPlayTriggerIos(audioElRef);

    const playlistData = !playlistId ? await getData() : playListArray;
    if (playlistData && playlistData.songs) {
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
      } = (() => {
        if (playlistId && playlist_songId) {
          return playlistData.songs.byId[playlist_songId];
        }
        return playlistData.songs.byId[playlistData.songs.idArray[0]];
      })();
      const uniUrl = id;
      setPlayListArray({
        [listId || ""]: playlistData,
      });
      if (playlistId) {
        // the playlist is playing and direct playback button does not know which song is currently playling , so  it check in zustand
        setPlay("toggle_key", undefined);
        setPlayList("toggle_key", undefined);
      } else {
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
        setPlaylistId({
          [listId || ""]: [listId, id],
        });
        setPlayList(listId || "", true);
        setPlay(uniUrl || "", true);
      }
    }
  };

  return (
    <button
      className={className}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handlePlayClick();
      }}
    >
      <TogglePlayButton
        isPlay={IsPlayList}
        pauseIcon={Pause}
        playIcon={Play}
        size="medium"
      />
    </button>
  );
}

export default DirectPlayButton;
