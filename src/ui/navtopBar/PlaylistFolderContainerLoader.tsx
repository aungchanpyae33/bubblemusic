import { useVirtuosoLoader } from "@/lib/CustomHooks/useVirtuosoLoader";
import { RefObject } from "react";

function PlaylistFolderContainerLoader({
  scrollRef,
  length,
}: {
  scrollRef: RefObject<HTMLElement | null>;
  length: number;
}) {
  const [count] = useVirtuosoLoader({ containerRef: scrollRef, length });
  return (
    <div className="absolute inset-0  ">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="p-2 ">
          <div className=" h-[50px]  animate-pulse leading-relaxed  flex items-center gap-x-2">
            <div className="size-[50px]  bg-placeholder relative  cursor-pointer"></div>
            <div className=" flex-1 ">
              <div className=" w-2/3 h-3 rounded-md bg-placeholder   truncate "></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlaylistFolderContainerLoader;
