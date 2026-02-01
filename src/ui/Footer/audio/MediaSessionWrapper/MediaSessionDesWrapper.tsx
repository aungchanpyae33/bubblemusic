import useMediaSessionDes from "@/lib/CustomHooks/MediaSession/useMediaSessionDescription";
import type { Artist } from "../../../../../database.types-fest";

function MediaSessionDesWrapper({
  name,
  artists,
}: {
  name: string;
  artists: Artist[];
}) {
  useMediaSessionDes(name, artists);
  return null;
}

export default MediaSessionDesWrapper;
