"use client";
// stack context to manage the stack number for more option and its sub more option component
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface MoreOptionStackContext {
  stack: number;
  setStack: React.Dispatch<SetStateAction<number>>;
}

interface ContextMoreOptionStackProps {
  children: ReactNode;
}
const MoreOptionStackContext = createContext<
  MoreOptionStackContext | undefined
>(undefined);

export const useMoreOptionStackContext = () => {
  const context = useContext(MoreOptionStackContext);
  if (context === undefined) {
    throw new Error(
      "useMoreOptionStackContext must be used within a MoreOptionStackContext.Provider",
    );
  }
  return context;
};

function ContextMoreOptionStack({ children }: ContextMoreOptionStackProps) {
  const [stack, setStack] = useState(0);
  const value = { stack, setStack };

  return (
    <MoreOptionStackContext.Provider value={value}>
      {children}
    </MoreOptionStackContext.Provider>
  );
}

export default ContextMoreOptionStack;
