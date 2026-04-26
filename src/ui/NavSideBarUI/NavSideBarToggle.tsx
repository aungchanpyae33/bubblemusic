import { X } from "lucide-react";
import { SetStateAction } from "react";
import IconWrapper from "../general/IconWrapper";

function NavSidebarToggle({
  setOpen,
  open,
}: {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) {
  return (
    <button
      onClick={() => {
        setOpen(!open);
      }}
      className=" w-[70px] cursor-pointer h-[70px] flex items-center justify-center "
    >
      <IconWrapper size="large" Icon={X} />
    </button>
  );
}

export default NavSidebarToggle;
