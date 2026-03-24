import { ReactNode } from "react";

function CategoryContainer({ children }: { children: ReactNode }) {
  return (
    <div className="h-full grid grid-cols-4 lg:grid-cols-6 md:grid-cols-5 shrink-0  grow-0 gap-4   justify-between">
      {children}
    </div>
  );
}

export default CategoryContainer;
