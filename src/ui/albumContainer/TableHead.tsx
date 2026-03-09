"use client";
import { useTableHeadContext } from "./TableHeadBgChange";
import clsx from "clsx";

function TableHead({ children }: { children: React.ReactNode }) {
  const { isStuck } = useTableHeadContext();
  return (
    <thead
      className={clsx(
        "sticky z-10 transition-colors duration-300   top-0 mb-[72px]  h-[65px]",
        // mb-[72px](the same height of the row) to prevent cover to the  last row
        {
          "bg-surface-1": isStuck,
          " bg-inherit ": !isStuck,
        },
      )}
    >
      {children}
    </thead>
  );
}

export default TableHead;
