import { ReactNode } from "react";

function OptionSubArrow({ children }: { children: ReactNode }) {
  return <div className="w-fit flex items-center h-full">{children}</div>;
}

export default OptionSubArrow;
