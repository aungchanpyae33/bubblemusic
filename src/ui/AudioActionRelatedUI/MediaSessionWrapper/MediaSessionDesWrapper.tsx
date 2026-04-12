import useMediaSessionDes from "@/lib/CustomHooks/MediaSession/useMediaSessionDescription";
import type { Artist } from "../../../../database.types-fest";

function MediaSessionDesWrapper({
  name,
  artists,
  cover_url,
}: {
  cover_url: string;
  name: string;
  artists: Artist[];
}) {
  useMediaSessionDes(name, artists, cover_url);
  return null;
}

export default MediaSessionDesWrapper;
