import { isTouchPointer } from "@/lib/isTouchPointer";
import { ContextMoreOptionUnique } from "@/ui/trackComponent/MoreOptionUniqueContext";
import { useContext } from "react";

function OptionItem({
  children,
  isSub,
}: {
  children: React.ReactNode;
  isSub?: boolean;
}) {
  // to reset unique uuid when hover on not sub option item
  const { setUuidState } = useContext(ContextMoreOptionUnique);
  const handleEnter = (e: React.PointerEvent) => {
    if (isTouchPointer(e)) return;
    if (isSub) return;
    setUuidState("");
  };
  return (
    <li
      className="h-12 w-full text-sm relative  hover:bg-surface-2  flex items-center rounded-md active:bg-surface-1 transition-colors duration-200"
      onPointerEnter={handleEnter}
    >
      {children}
    </li>
  );
}

export default OptionItem;
