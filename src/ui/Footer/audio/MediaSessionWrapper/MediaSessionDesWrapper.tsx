import MediaSessionDes from "@/lib/CustomHooks/MediaSession/MediaSessionDescription";
import type { Artist } from "../../../../../database.types-fest";

function MediaSessionDesWrapper({
  name,
  artists,
}: {
  name: string;
  artists: Artist[];
}) {
  MediaSessionDes(name, artists);
  return null;
}

export default MediaSessionDesWrapper;
