import ContextInfoTrack from "@/ui/trackComponent/ContextInfoTrack";
import type { SongInfo } from "../../../../database.types-fest";
import ContextLike from "@/ui/trackComponent/ContextLike";
import { ReactNode } from "react";

interface ListRowTrackOptionAndLikeProps {
  song: SongInfo;
  listSongId?: string;
  inPage?: boolean;
  children: ReactNode;
}

function ListRowTrackOptionAndLike({
  song,
  listSongId,
  inPage,
  children,
}: ListRowTrackOptionAndLikeProps) {
  return (
    <ContextInfoTrack id={listSongId} song={song} inPage={inPage}>
      <ContextLike id={song.song_id}>{children}</ContextLike>
    </ContextInfoTrack>
  );
}

export default ListRowTrackOptionAndLike;
