import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
interface IconWrapperProps extends React.ComponentProps<"svg"> {
  Icon: LucideIcon;
  size?: "exLarge" | "large" | "medium" | "small";
  notClickable?: boolean;
}
const baseSize = {
  exLarge: "w-10 h-10",
  large: "w-8 h-8",
  medium: "w-7 h-7",
  small: "w-6 h-6",
};
function IconWrapper({
  Icon,
  size,
  notClickable,
  className,
  ...props
}: IconWrapperProps) {
  const baseStyle = `text-icon-foreground stroke-[0.8]  hover:scale-105   active:scale-90 transition-transform duration-200 ${
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
