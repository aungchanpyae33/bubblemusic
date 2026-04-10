import type { ListSongPage } from "@/database/data-types-return";
import excludeCurrentSongs from "@/lib/excludeCurrentSongs";
import outputCurrentIndex from "@/lib/OutputCurrentIndex";
import shufflePlaylist from "@/lib/shufflePlaylist";
import {
  currentSongPlaylisthuffleAction,
  previousSongPlaylist,
  previousSongPlaylistAction,
  StorePlayListIdState,
  usePreviousPlayList,
  useRepeatAndCurrentPlayList,
  useStorePlayListId,
} from "@/lib/zustand";
import IconWrapper from "@/ui/general/IconWrapper";
import clsx from "clsx";
import { Shuffle } from "lucide-react";
import { useState } from "react";
interface Props extends React.ComponentProps<"button"> {
  listSong: ListSongPage;
  id: string;
}
function AudioFunctionShuffle({ className, listSong, id }: Props) {
  const [isShuffle, setIsShuffle] = useState(false);
  const previousPlayListArray = usePreviousPlayList(
    (state: previousSongPlaylist) => state.previousPlayListArray,
  ) as ListSongPage;

  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) => Object.values(state.playlistId)[0] || [],
  ) as string[];

  const shufflePlayListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylisthuffleAction) => state.shufflePlayListArray,
  );
  const setPreviousPlayListArray = usePreviousPlayList(
    (state: previousSongPlaylistAction) => state.setPreviousPlayListArray,
  );

  function shuffle() {
    if (!listSong || !listSong.songs || listSong.songs.idArray.length === 0)
      return;

    const currentIndex = outputCurrentIndex(listSong.songs.idArray, id);
    const currentSong = listSong.songs.idArray[currentIndex];

    const excludeCurrentSongsArray = excludeCurrentSongs(
      listSong as ListSongPage,
      currentIndex,
    );
    if (!excludeCurrentSongsArray) return null;
    const shufflePlaylistOutput = shufflePlaylist(
      excludeCurrentSongsArray,
      isShuffle,
      listSong,
      currentSong,
      previousPlayListArray,
    );
    setPreviousPlayListArray(listSong);
    shufflePlayListArray({
      [playlistId[0] || ""]: shufflePlaylistOutput,
    });
    setIsShuffle(!isShuffle);
  }
  return (
    <button className={className} onClick={shuffle}>
      {/* {isShuffle ? "unSh" : "Shu"} */}
      <IconWrapper
        Icon={Shuffle}
        size="small"
        className={clsx("", {
          "text-brand": isShuffle,
        })}
      />
    </button>
  );
}

export default AudioFunctionShuffle;
