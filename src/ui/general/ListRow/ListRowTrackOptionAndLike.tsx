import ContextInfoTrack from "@/Context/ContextInfoTrack";
import type { SongInfo } from "../../../../database.types-fest";
import { ReactNode } from "react";
import ContextLike from "@/Context/ContextLike";

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
