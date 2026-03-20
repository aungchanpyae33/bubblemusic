import { EllipsisVertical } from "lucide-react";
import { useVirtuosoLoader } from "@/lib/CustomHooks/useVirtuosoLoader";
import IconWrapper from "../IconWrapper";
const widths = ["w-[60%]", "w-[50%]", "w-[43%]", "w-[70%]"];

const getWidth = (i: number) => widths[i % widths.length];
function VirtuosoLoaderSingleItemList({ length }: { length: number }) {
  const count = useVirtuosoLoader({ length });
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

          <div className=" flex-col overflow-hidden flex justify-center gap-3">
            <div className={`${getWidth(i)} h-3 rounded-md bg-placeholder`} />
            <div
              className={`${getWidth(i + 1)} h-3 rounded-md bg-placeholder opacity-85 `}
            />
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
