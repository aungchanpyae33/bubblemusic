"use client";
// uuid context store for unique option button
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ContextMoreOptionValue {
  uuidState: string;
  setUuidState: React.Dispatch<SetStateAction<string>>;
}

interface MoreOptionUniqueContextProps {
  children: ReactNode;
}
export const ContextMoreOptionUnique = createContext<
  ContextMoreOptionValue | undefined
>(undefined);

export const useMoreOptionUniqueContext = () => {
  const context = useContext(ContextMoreOptionUnique);
  if (context === undefined) {
    throw new Error(
      "useMoreOptionUniqueContext must be used within a ContextMoreOptionUnique.Provider",
    );
  }
  return context;
};

function MoreOptionUniqueContext({ children }: MoreOptionUniqueContextProps) {
  const [uuidState, setUuidState] = useState("");
  const value = { uuidState, setUuidState };

  return (
    <ContextMoreOptionUnique.Provider value={value}>
      {children}
    </ContextMoreOptionUnique.Provider>
  );
}

export default MoreOptionUniqueContext;
