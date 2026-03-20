"use client";
// uuid context store for unique option button
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface MoreOptionUniqueContextProps {
  uuidState: string;
  setUuidState: React.Dispatch<SetStateAction<string>>;
}

interface ContextMoreOptionUniqueProps {
  children: ReactNode;
}
const MoreOptionUniqueContext = createContext<
  MoreOptionUniqueContextProps | undefined
>(undefined);

export const useMoreOptionUniqueContext = () => {
  const context = useContext(MoreOptionUniqueContext);
  if (context === undefined) {
    throw new Error(
      "useMoreOptionUniqueContext must be used within a MoreOptionUniqueContext.Provider",
    );
  }
  return context;
};

function ContextMoreOptionUnique({ children }: ContextMoreOptionUniqueProps) {
  const [uuidState, setUuidState] = useState("");
  const value = { uuidState, setUuidState };

  return (
    <MoreOptionUniqueContext.Provider value={value}>
      {children}
    </MoreOptionUniqueContext.Provider>
  );
}

export default ContextMoreOptionUnique;
