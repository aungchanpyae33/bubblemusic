import { ReactNode } from "react";
import { useToggleContext } from "./ToggleContext";

function SearchResultWrapper({ children }: { children: ReactNode }) {
  const { open } = useToggleContext();
  return open && children;
}

export default SearchResultWrapper;
