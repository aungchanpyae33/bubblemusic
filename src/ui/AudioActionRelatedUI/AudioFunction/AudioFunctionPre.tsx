import type { ListSongPage } from "@/database/data-types-return";
import outputCurrentIndex from "@/lib/OutputCurrentIndex";

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
import IconWrapper from "@/ui/general/IconWrapper";
import { SkipBack } from "lucide-react";

interface Props extends React.ComponentProps<"button"> {
  listSong: ListSongPage;
  id: string;
}
function AudioFunctionPre({ listSong, className, id }: Props) {
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

  function songFunctionPre(id_scope = id) {
    if (!listSong || !listSong.songs || listSong.songs.idArray.length === 0)
      return;
    const currentIndex = outputCurrentIndex(listSong.songs.idArray, id_scope);
    const songList = listSong.songs;
    if (currentIndex <= 0) return;
    const { url, duration, name, id, song_id, artists, is_lyric, cover_url } =
      songList.byId[listSong.songs.idArray[currentIndex - 1]];

    const uniUrl = id;
    updateSongCu({
      [uniUrl || ""]: url,
      duration,
      name,
      id,
      song_id,
      artists,
      is_lyric,
      cover_url,
    });
    setPlaylistId({ [playlistId[0] || ""]: [playlistId[0], id] });
    setPlayList(playlistId[0], true);
    setPlay(uniUrl || "", true);
  }
  return (
    <button onClick={() => songFunctionPre()} className={className}>
      <IconWrapper size="small" Icon={SkipBack} />
    </button>
  );
}

export default AudioFunctionPre;
