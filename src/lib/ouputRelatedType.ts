import type { MediaItemType } from "../../database.types-fest";

export const outputRelatedType = (type: MediaItemType) => {
  if (type === "playlist") return "profile";
  if (type === "album") return "artist";
  if (type === "track") return "artist";
  return null;
};
