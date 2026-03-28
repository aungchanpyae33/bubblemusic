import React from "react";
import IconWrapper from "../general/IconWrapper";
import { ArrowLeft, Search } from "lucide-react";
import Button from "@/components/button/Button";
interface SearchToggleButtonProps extends React.ComponentProps<"button"> {
  show: boolean;
}
function SearchToggleButton({
  show,
  className,
  ...prop
}: SearchToggleButtonProps) {
  return (
    <Button
      type="button"
      onPointerDown={(e) => e.preventDefault()}
      className={className}
      {...prop}
    >
      {show ? (
        <IconWrapper size="small" Icon={ArrowLeft} />
      ) : (
        <IconWrapper size="small" className="" Icon={Search} />
      )}
    </Button>
  );
}

export default SearchToggleButton;
