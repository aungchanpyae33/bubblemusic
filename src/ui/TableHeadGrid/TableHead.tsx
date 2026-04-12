"use client";
import { cn } from "@/lib/utils";
import SingleItemRow from "../general/SingleItemRow/SingleItemRow";
import { useTableHeadContext } from "@/Context/ContextTableHeadBgChange";

function TableHead({ children }: { children: React.ReactNode }) {
  const { isStuck } = useTableHeadContext();
  return (
    <SingleItemRow
      className={cn(
        "md:gap-2 lg:gap-3 lg:grid-cols-[64px_1fr_1fr_64px_1fr_40px] sticky z-20  top-0 font-semibold  sm:grid-cols-[64px_3fr_1fr_40px_40px] grid-cols-[64px_1fr_40px_40px]",
        isStuck && "bg-surface-1",
        !isStuck && " bg-inherit",
      )}
    >
      {children}
    </SingleItemRow>
  );
}

export default TableHead;
