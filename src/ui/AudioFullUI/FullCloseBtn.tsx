import IconWrapper from "@/ui/general/IconWrapper";
import { X } from "lucide-react";
import { Dispatch, RefObject, SetStateAction } from "react";

interface FullCloseBtnProps {
  toggleRef: RefObject<HTMLButtonElement | null>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
function FullCloseBtn({ toggleRef, setOpen }: FullCloseBtnProps) {
  return (
    <button
      className="  transition-colors  duration-200 bg-surface-1 hover:bg-surface-2 p-1 rounded-full flex items-center justify-center"
      onClick={() => {
        toggleRef.current?.focus();
        setOpen(!open);
      }}
    >
      <IconWrapper size="medium" Icon={X} />
    </button>
  );
}

export default FullCloseBtn;
