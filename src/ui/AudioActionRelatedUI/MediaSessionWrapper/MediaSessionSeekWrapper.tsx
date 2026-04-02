import useMediaSessionSeek from "@/lib/CustomHooks/MediaSession/useMediaSessionSeek";
import { ReactNode } from "react";

function MediaSessionSeekWrapper({
  children,
  duration,
}: {
  children: ReactNode;
  duration: number;
}) {
  useMediaSessionSeek(duration);
  return children;
}

export default MediaSessionSeekWrapper;
