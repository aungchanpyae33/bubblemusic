import type { NavbarList } from "@/database/data-types-return";
import type { listInfo, listSongsSection } from "../../database.types-fest";

export const generateValue = (
  isDataExist: NavbarList,
  list: listInfo | listSongsSection,
) => {
  if (isDataExist) {
    return { ...list, ...isDataExist };
  }
  return { ...list, source: "none" };
};
