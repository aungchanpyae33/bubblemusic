import MediaSessionButton from "@/lib/CustomHooks/MediaSession/MediaSessionButton";
import MediaSessionToggle from "@/lib/CustomHooks/MediaSession/MediaSessionToggle";
import { ReactNode } from "react";

function MediaSessionButtonWrapper({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  MediaSessionButton(id);
  MediaSessionToggle();
  return children;
}

export default MediaSessionButtonWrapper;
