import { ReactNode } from "react";

function CategoryItem({ children }: { children: ReactNode }) {
  return (
    <div className="border border-borderFull rounded-md  overflow-hidden  w-[150px]">
      <div className=" h-12 flex items-center justify-center bg-surface-1 hover:bg-surface-2">
        {children}
      </div>
    </div>
  );
}

export default CategoryItem;
