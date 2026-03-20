import { useToggleContext } from "@/Context/ContextToggle";
import { ReactNode } from "react";

function SearchResultWrapper({ children }: { children: ReactNode }) {
  const { open } = useToggleContext();
  return open && children;
}

export default SearchResultWrapper;
