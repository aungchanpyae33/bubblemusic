import { ReactNode } from "react";

function ListGeneralHeader({ children }: { children: ReactNode }) {
  return <h3 className=" my-4 text-lg font-semibold">{children}</h3>;
}

export default ListGeneralHeader;
