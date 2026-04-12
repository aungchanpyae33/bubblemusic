import { ReactNode } from "react";

function SubAppWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 justify-center items-center h-96 p-14">
      {children}
    </div>
  );
}

export default SubAppWrapper;
