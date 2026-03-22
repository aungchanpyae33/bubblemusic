import IconWrapper from "@/ui/general/IconWrapper";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

function InitCreateButton({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      className="mr-2"
      onClick={() => {
        setOpen(true);
      }}
    >
      <IconWrapper size="large" Icon={Plus} />
    </button>
  );
}

export default InitCreateButton;
