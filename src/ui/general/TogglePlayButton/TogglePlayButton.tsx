import { LoaderCircle, type LucideIcon } from "lucide-react";
import IconWrapper, { IconWrapperProps } from "../IconWrapper";
import { useAudioLoadingContext } from "@/Context/ContextAudioLoading";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface TogglePlayButtonProps extends ComponentProps<"div"> {
  isPlay: boolean | undefined;
  size?: IconWrapperProps["size"];
  notClickable?: boolean;
  playIcon: LucideIcon;
  className?: string;
  pauseIcon: LucideIcon;
}
function TogglePlayButton({
  isPlay,
  playIcon,
  pauseIcon,
  size,
  notClickable,
  className,
  ...props
}: TogglePlayButtonProps) {
  const { loading } = useAudioLoadingContext();
  return (
    <div className={cn("p-1 rounded-full bg-surface-1", className)} {...props}>
      {loading ? (
        <div className="animate-spin">
          <IconWrapper
            Icon={LoaderCircle}
            size={size}
            notClickable={notClickable}
          />
        </div>
      ) : isPlay ? (
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
