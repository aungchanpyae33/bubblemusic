import { ShowBlockAction, useShowBlock } from "@/lib/zustand";
import IconWrapper from "@/ui/general/IconWrapper";
import { ChevronDown } from "lucide-react";

function CloseShowBlockBtn() {
  const setShowBlock = useShowBlock(
    (state: ShowBlockAction) => state.setShowBlock,
  );
  return (
    <button
      className="  size-[60px] flex border-l items-center justify-center border-borderFull   "
      onClick={() => setShowBlock(undefined)}
    >
      <IconWrapper Icon={ChevronDown} size="large" />
    </button>
  );
}

export default CloseShowBlockBtn;
