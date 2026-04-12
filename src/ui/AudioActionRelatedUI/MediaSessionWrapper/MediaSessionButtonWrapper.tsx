import useMediaSessionButton from "@/lib/CustomHooks/MediaSession/useMediaSessionButton";
import useMediaSessionToggle from "@/lib/CustomHooks/MediaSession/useMediaSessionToggle";
import { ReactNode } from "react";

function MediaSessionButtonWrapper({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  useMediaSessionButton(id);
  useMediaSessionToggle();
  return children;
}

export default MediaSessionButtonWrapper;
