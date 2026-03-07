import { ReactNode } from "react";

function ListGeneralHeader({ children }: { children: ReactNode }) {
  return <h3>{children}</h3>;
}

export default ListGeneralHeader;
