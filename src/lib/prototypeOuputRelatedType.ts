import { Database } from "../../database.types";

export const outputRelatedType = (
  type: Database["public"]["Enums"]["media_item_type"],
) => {
  if (type === "playlist") return "profile";
  if (type === "album") return "artist";
  if (type === "track") return "artist";
  return null;
};
