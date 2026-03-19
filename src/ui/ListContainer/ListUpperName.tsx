import { ReactNode } from "react";

function ListUpperName({ children }: { children: ReactNode }) {
  return (
    <p className="font-black truncate text-2xl md:text-3xl lg:text-4xl">
      {children}
    </p>
  );
}

export default ListUpperName;
