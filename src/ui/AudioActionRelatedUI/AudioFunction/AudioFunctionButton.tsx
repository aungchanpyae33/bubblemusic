import { useRepeatAndCurrentPlayList } from "@/lib/zustand";
import { ReactNode } from "react";
import type { currentSongPlaylist } from "@/lib/zustand";
import type { ListSongPage } from "@/database/data-types-return";
interface AudioFunctionButtonProps {
  children: (playListArray: ListSongPage) => ReactNode;
}
function AudioFunctionButton({ children }: AudioFunctionButtonProps) {
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) => Object.values(state.playListArray)[0] || [],
  ) as ListSongPage;
  return children(playListArray);
}

export default AudioFunctionButton;
