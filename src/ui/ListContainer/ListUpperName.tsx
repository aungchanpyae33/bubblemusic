import { ReactNode } from "react";

function ListUpperName({ children }: { children: ReactNode }) {
  return (
    <p className="font-bold truncate   text-xl   md:text-2xl lg:text-3xl">
      {children}
    </p>
  );
}

export default ListUpperName;
