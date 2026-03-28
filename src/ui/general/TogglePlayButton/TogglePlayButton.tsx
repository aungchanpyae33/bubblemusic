import type { LucideIcon } from "lucide-react";
import IconWrapper, { IconWrapperProps } from "../IconWrapper";

interface TogglePlayButtonProps {
  isPlay: boolean | undefined;
  size?: IconWrapperProps["size"];
  notClickable?: boolean;
  playIcon: LucideIcon;
  pauseIcon: LucideIcon;
}
function TogglePlayButton({
  isPlay,
  playIcon,
  pauseIcon,
  size,
  notClickable,
}: TogglePlayButtonProps) {
  return (
    <div className="p-1 rounded-full bg-surface-1">
      {isPlay ? (
        <IconWrapper
          className="fill-foreground"
          Icon={pauseIcon}
          size={size}
          notClickable={notClickable}
        />
      ) : (
        <IconWrapper
          className="fill-foreground"
          Icon={playIcon}
          size={size}
          notClickable={notClickable}
        />
      )}
    </div>
  );
}

export default TogglePlayButton;
