import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
export interface IconWrapperProps extends React.ComponentProps<"svg"> {
  Icon: LucideIcon;
  size?: "exLarge" | "large" | "medium" | "small" | "exSmall";
  notClickable?: boolean;
}
export const baseSize = {
  exLarge: "size-10 md:size-11",
  large: "size-8 md:size-9",
  medium: "size-7 md:size-8",
  small: "size-6 md:size-7",
  exSmall: "size-5 md:size-6",
};
function IconWrapper({
  Icon,
  size,
  notClickable,
  className,
  ...props
}: IconWrapperProps) {
  const baseStyle = `text-icon-foreground stroke-[0.8]  hover:scale-105 active:scale-90 transition-transform duration-200 ${
    baseSize[size!]
  }`;

  return (
    <Icon
      className={cn(baseStyle, className, {
        "hover:scale-100 active:scale-100": notClickable,
      })}
      {...props}
    />
  );
}

export default IconWrapper;
