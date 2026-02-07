import { RefObject } from "react";
import IconWrapper from "../general/IconWrapper";
import { EllipsisVertical } from "lucide-react";
import { useVirtuosoLoader } from "@/lib/CustomHooks/useVirtuosoLoader";

function QueueLoader({
  queeRef,
  length,
}: {
  queeRef: RefObject<HTMLElement | null>;
  length: number;
}) {
  const [count] = useVirtuosoLoader({ containerRef: queeRef, length });
  return (
    <div className="absolute inset-0  ">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="flex gap-x-2   p-1 group animate-pulse items-stretch"
        >
          <div className="size-[50px] bg-placeholder relative"></div>

          <div className="flex-1 flex-col overflow-hidden flex justify-center gap-1">
            <div className=" w-16 h-3 rounded-md bg-placeholder"></div>
            <div className=" w-28 h-3 rounded-md bg-placeholder"></div>
          </div>

          <div className="w-[30px] flex items-center">
            <IconWrapper Icon={EllipsisVertical} size="small" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default QueueLoader;
