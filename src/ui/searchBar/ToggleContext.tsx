"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
interface contextProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const ContextToggle = createContext<contextProps | undefined>(undefined);

export const useToggleContext = () => {
  const context = useContext(ContextToggle);
  if (context === undefined) {
    throw new Error(
      "useToggleContext must be used within a ContextToggle.Provider",
    );
  }
  return context;
};
function ToggleContext({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = { open, setOpen };
  return (
    <ContextToggle.Provider value={value}>{children}</ContextToggle.Provider>
  );
}

export default ToggleContext;
