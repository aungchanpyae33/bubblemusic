import type { ListSongPage, NavbarList } from "@/database/data-types-return";
import type { listInfo } from "../../database.types-fest";
import type {
  SongListPageValue,
  SongListValue,
} from "@/Context/ContextSongListContainer";

export const generateByMergeWithLib = (
  isDataExist: NavbarList,
  list: listInfo | ListSongPage,
  inPage?: boolean,
): SongListValue | SongListPageValue => {
  if (isDataExist) {
    return { ...list, ...isDataExist, inPage };
  }
  return { ...list, source: "none", inPage };
};
