import {
  useDirectPlayBack,
  useSong,
  useSongFunction,
  useStorePlayListId,
} from "@/lib/zustand";

import type {
  DirectPlayBackAction,
  SongActions,
  SongFunctionActions,
  StorePlayListIdState,
  StorePlayListIdStateAction,
} from "@/lib/zustand";
import { SkipForward } from "lucide-react";
import IconWrapper from "@/ui/general/IconWrapper";
import outputCurrentIndex from "@/lib/OutputCurrentIndex";
import type { ListSongPage } from "@/database/data-types-return";

interface Props extends React.ComponentProps<"button"> {
  listSong: ListSongPage;
  id: string;
}
function AudioFunctionNext({ listSong, className, id }: Props) {
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);
  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) => Object.values(state.playlistId)[0] || [],
  ) as string[];

  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay,
  );
  const setPlaylistId = useStorePlayListId(
    (state: StorePlayListIdStateAction) => state.setPlaylistId,
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList,
  );
  function songFunctionNext(id_scope = id) {
    if (!listSong || !listSong.songs || listSong.songs.idArray.length === 0)
      return;
    const currentIndex = outputCurrentIndex(listSong.songs.idArray, id_scope);
    const songList = listSong.songs;

    if (currentIndex >= listSong.songs.idArray.length - 1) return;
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
    } = songList.byId[listSong.songs.idArray[currentIndex + 1]];

    const uniUrl = id;
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
    setPlaylistId({ [playlistId[0] || ""]: [playlistId[0], id] });
    setPlayList(playlistId[0], true);
    setPlay(uniUrl || "", true);
  }

  return (
    <button onClick={() => songFunctionNext()} className={className}>
      <IconWrapper Icon={SkipForward} size="small" />
    </button>
  );
}

export default AudioFunctionNext;
