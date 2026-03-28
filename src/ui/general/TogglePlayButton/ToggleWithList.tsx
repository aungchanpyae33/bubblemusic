"use client";
import type { ListSongPage } from "@/database/data-types-return";
import {
  useDirectPlayBack,
  useInstantFallBackAudioFull,
  useRepeatAndCurrentPlayList,
  useShouldFetchSongsList,
  useSong,
  useSongFunction,
  useStorePlayListId,
} from "@/lib/zustand";
import type {
  SongState,
  SongActions,
  SongFunctionState,
  SongFunctionActions,
  currentSongPlaylistAction,
  DirectPlayBackAction,
  StorePlayListIdStateAction,
  ShouldFetchSongsListIdAction,
  isFallBackAudioActions,
} from "@/lib/zustand";
import { Pause, Play } from "lucide-react";
import TogglePlayButton from "@/ui/general/TogglePlayButton/TogglePlayButton";
import type { SongInfo } from "../../../../database.types-fest";
import { PlayButtonOverlayOnImage } from "@/lib/StyleUtils/tailwindStyle";
import { audioPlayTriggerIos } from "@/lib/audioPlayTriggerIOS";
import { useAudioElementContext } from "@/Context/ContextAudioWrapper";

interface ToggleWithListProp {
  listSong: ListSongPage;
  song: SongInfo;
}
const ToggleWithList = ({ listSong, song }: ToggleWithListProp) => {
  const uniUrl = song.id;
  const playlistId = listSong.id;
  // for toggle audio
  const Isplay = useSongFunction(
    (state: SongFunctionState) => state.Isplay[uniUrl || ""],
  );
  //  for current song with presist
  const songCuUrl = useSong(
    (state: SongState) =>
      (state.songCu as Record<string, string>)[uniUrl || ""],
  );

  const FetchSongsListIdAction = useShouldFetchSongsList(
    (state: ShouldFetchSongsListIdAction) => state.FetchSongsListIdAction,
  );
  // for current playlist(id and song currentSongUrl as to know for directplayback button)
  const setPlaylistId = useStorePlayListId(
    (state: StorePlayListIdStateAction) => state.setPlaylistId,
  );

  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay,
  );
  const setPlayListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylistAction) => state.setPlayListArray,
  );
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);
  const setIsFallBackAudio = useInstantFallBackAudioFull(
    (state: isFallBackAudioActions) => state.setIsFallBackAudio,
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList,
  );
  const { audioElRef } = useAudioElementContext();
  return (
    <button
      role="rowCell1"
      aria-label="Play or Pause Audio"
      onKeyDown={(e) => {
        if (e.key === " " || e.code === "Space") {
          e.stopPropagation();
        }
      }}
      onClick={() => {
        setIsFallBackAudio(); //fallback dynamic import

        setPlayListArray({
          [playlistId || ""]: listSong,
        });
        FetchSongsListIdAction(undefined);

        // to handle same song but different playlist or album

        // safe to check currentsong exist because it will only one source of truth
        if (songCuUrl) {
          setPlay("toggle_key", undefined);
          setPlayList("toggle_key", undefined);
        } else {
          const data = {
            [uniUrl || ""]: song.url,
            sege: song.sege,
            duration: song.duration,
            name: song.name,
            song_time_stamp: song.song_time_stamp,
            id: song.id,
            is_lyric: song.is_lyric,
            song_id: song.song_id,
            artists: song.artists,
            cover_url: song.cover_url,
          };
          audioPlayTriggerIos(audioElRef);
          updateSongCu(data);
          setPlaylistId({
            [playlistId || ""]: [playlistId, song.id],
          });
          setPlayList(playlistId || "", true);
          setPlay(uniUrl || "", true);
        }
      }}
      className={PlayButtonOverlayOnImage}
      id="play-icon"
    >
      <span className=" flex justify-center">
        <TogglePlayButton
          size="exSmall"
          isPlay={song.url === songCuUrl && Isplay}
          playIcon={Play}
          pauseIcon={Pause}
        />
      </span>
    </button>
  );
};

export default ToggleWithList;
