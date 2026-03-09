import { X } from "lucide-react";
import { SetStateAction, useRef } from "react";
import IconWrapper from "../general/IconWrapper";
import useCloseFunctoionStack from "@/lib/CustomHooks/useCloseFunctionStack";

function NavSidebarToggle({
  setOpen,
  open,
}: {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) {
  const closeElement = useRef<HTMLButtonElement | null>(null);
  useCloseFunctoionStack(open, setOpen, closeElement);
  return (
    <button
      onClick={() => {
        setOpen(!open);
      }}
      className=" w-[70px] cursor-pointer h-[70px] flex items-center justify-center "
      ref={closeElement}
      tabIndex={open ? 0 : -1}
    >
      <IconWrapper size="large" Icon={X} />
    </button>
  );
}

export default NavSidebarToggle;
