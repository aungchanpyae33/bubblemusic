import type { NavbarList } from "@/database/data-types-return";
import type { listInfo, listSongsSection } from "../../database.types-fest";
import { SongListValue } from "@/ui/playlist/playlistOption/ContextSongListContainer";

export const generateByMergeWithLib = (
  isDataExist: NavbarList,
  list: listInfo | listSongsSection,
): SongListValue => {
  if (isDataExist) {
    return { ...list, ...isDataExist };
  }
  return { ...list, source: "none" };
};
