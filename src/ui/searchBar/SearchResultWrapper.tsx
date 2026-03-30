import { useToggleContext } from "@/Context/ContextToggle";
import { ReactNode } from "react";

function SearchResultWrapper({ children }: { children: ReactNode }) {
  const { open } = useToggleContext();
  return (
    open && (
      <div className="w-full absolute bg-pop  -bottom-1 translate-y-full">
        {children}
      </div>
    )
  );
}

export default SearchResultWrapper;
