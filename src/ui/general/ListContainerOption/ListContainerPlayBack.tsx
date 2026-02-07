"use client";
import {
  currentSongPlaylistAction,
  DirectPlayBackAction,
  DirectPlayBackState,
  isFallBackAudioActions,
  ShouldFetchSongsListIdAction,
  SongActions,
  SongDetail,
  SongFunctionActions,
  SongState,
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
import IconWrapper from "../IconWrapper";
import { Pause, Play } from "lucide-react";
import type { ListSongPage } from "@/database/data-types-return";

interface ListContainerPlayBackProps {
  list: ListSongPage;
}
function ListContainerPlayBack({ list }: ListContainerPlayBackProps) {
  const playListId = list.id;
  const IsPlayList = useDirectPlayBack(
    (state: DirectPlayBackState) => state.IsPlayList[playListId || ""],
  );
  const { id: id_scope } = useSong(
    (state: SongState) => state.songCu,
  ) as SongDetail;
  // current playlist id and current song
  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) =>
      (state.playlistId as Record<string, Array<string>>)[playListId || ""],
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
  const FetchSongsListIdAction = useShouldFetchSongsList(
    (state: ShouldFetchSongsListIdAction) => state.FetchSongsListIdAction,
  );
  const setPlayListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylistAction) => state.setPlayListArray,
  );
  const setIsFallBackAudio = useInstantFallBackAudioFull(
    (state: isFallBackAudioActions) => state.setIsFallBackAudio,
  );

  if (!list.songs) return null; // no render the toggle playback
  if (list.songs.idArray.length === 0) return;
  const handlePlayClick = async () => {
    if (!list.songs) return null; // no render the toggle playback)
    setIsFallBackAudio(); //fallback dynamic import
    FetchSongsListIdAction(undefined);
    if (list) {
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
        if (playlistId) {
          return list.songs.byId[id_scope];
        }
        return list.songs.byId[list.songs.idArray[0]];
      })();
      const uniUrl = id;
      setPlayListArray({
        [playListId || ""]: list,
      });
      if (playlistId) {
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
          [playListId || ""]: [playListId, id],
        });
        setPlayList(playListId || "", true);
        setPlay(uniUrl || "", true);
      }
    }
  };
  return (
    <button
      className="p-2 bg-brand  rounded-full"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handlePlayClick();
      }}
    >
      {IsPlayList ? (
        <IconWrapper className="fill-foreground" size="medium" Icon={Pause} />
      ) : (
        <IconWrapper className="fill-foreground" size="medium" Icon={Play} />
      )}
    </button>
  );
}

export default ListContainerPlayBack;
