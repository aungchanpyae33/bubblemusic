import { RefObject } from "react";
import { EllipsisVertical } from "lucide-react";
import { useVirtuosoLoader } from "@/lib/CustomHooks/useVirtuosoLoader";
import IconWrapper from "../IconWrapper";

function VirtuosoLoaderSingleItemList({
  containerRef,
  length,
}: {
  containerRef: RefObject<HTMLElement | null>;
  length: number;
}) {
  const [count] = useVirtuosoLoader({ containerRef, length });
  return (
    <div className="absolute inset-0 overflow-y-auto scroll-container">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="grid-cols-[64px_1fr_40px] gap-1   grid rounded-md h-16   group animate-pulse items-stretch"
        >
          <div className="flex items-center justify-center ">
            <div className="size-12 bg-placeholder"> </div>
          </div>

          <div className=" flex-col overflow-hidden flex justify-center gap-1">
            <div className=" w-16 h-3 rounded-md bg-placeholder"></div>
            <div className=" w-28 h-3 rounded-md bg-placeholder"></div>
          </div>

          <div className=" flex items-center justify-center">
            <IconWrapper Icon={EllipsisVertical} size="small" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default VirtuosoLoaderSingleItemList;
