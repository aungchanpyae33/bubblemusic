import React from "react";
import IconWrapper from "../general/IconWrapper";
import { ArrowLeft, Search } from "lucide-react";
interface SearchToggleButtonProps extends React.ComponentProps<"button"> {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
function SearchToggleButton({
  show,
  setShow,
  className,
  ...prop
}: SearchToggleButtonProps) {
  return (
    <button
      type="button"
      onPointerDown={(e) => e.preventDefault()}
      className={className}
      {...prop}
    >
      {show ? (
        <IconWrapper size="medium" Icon={ArrowLeft} />
      ) : (
        <IconWrapper size="medium" className="" Icon={Search} />
      )}
    </button>
  );
}

export default SearchToggleButton;
