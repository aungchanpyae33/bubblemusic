import { useDataContext } from "@/Context/ContextMedia";
import useMediaSessionSeek from "@/lib/CustomHooks/MediaSession/useMediaSessionSeek";
import { ReactNode } from "react";

function MediaSessionSeekWrapper({
  children,
  duration,
}: {
  children: ReactNode;
  duration: number;
}) {
  const {
    loadNextSegment,
    segNum,
    sege,
    abortController,
    fetching,
    bufferThreshold,
    song_time_stamp,
  } = useDataContext();
  useMediaSessionSeek(
    fetching,
    abortController,
    segNum,
    sege,
    loadNextSegment,
    duration,
    bufferThreshold,
    song_time_stamp,
  );
  return children;
}

export default MediaSessionSeekWrapper;
