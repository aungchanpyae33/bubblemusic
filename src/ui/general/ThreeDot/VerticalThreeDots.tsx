import { EllipsisVertical } from "lucide-react";
import IconWrapper from "../IconWrapper";
interface VerticalThreeDotsProps extends React.ComponentProps<"svg"> {
  size?: "exLarge" | "large" | "medium" | "small";
  notClickable?: boolean;
}
function VerticalThreeDots({
  size,
  notClickable,
  ...props
}: VerticalThreeDotsProps) {
  return (
    <IconWrapper
      Icon={EllipsisVertical}
      size={size}
      notClickable={notClickable}
      {...props}
    />
  );
}

export default VerticalThreeDots;
