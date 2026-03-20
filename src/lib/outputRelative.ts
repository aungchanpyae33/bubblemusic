import { MediaItemType } from "../../database.types-fest";

type Relative = {
  id: string;
  name: string;
};

export function outputRelative(
  related_id: string,
  related_name: string,
  type: MediaItemType,
): Relative | undefined {
  if (type === "artist" || type === "profile") return undefined;
  return {
    id: related_id,
    name: related_name,
  };
}
