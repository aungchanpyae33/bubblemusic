"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
interface ContextToggleProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const ToggleContext = createContext<ContextToggleProps | undefined>(undefined);

export const useToggleContext = () => {
  const context = useContext(ToggleContext);
  if (context === undefined) {
    throw new Error(
      "useToggleContext must be used within a ToggleContext.Provider",
    );
  }
  return context;
};
function ContextToggle({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = { open, setOpen };
  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
}

export default ContextToggle;
