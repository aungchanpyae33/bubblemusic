"use client";
// store parent trigger mainly for more option rightnow , to send the parent trigge to modal box open case , so modal box -> escape can focus parent trigger element
import { createContext, ReactNode, RefObject, useContext } from "react";

interface OriginParentTriggerContextProps {
  originParentTriggerRef: RefObject<HTMLElement | null>;
}

interface ContextOriginParentTriggerProps {
  children: ReactNode;
  originParentTriggerRef: RefObject<HTMLElement | null>;
}
const OriginParentTriggerContext = createContext<
  OriginParentTriggerContextProps | undefined
>(undefined);

export const useOriginParentTriggerContext = () => {
  const context = useContext(OriginParentTriggerContext);
  if (context === undefined) {
    throw new Error(
      "useOriginParentTriggerContext must be used within a OriginParentTriggerContext.Provider",
    );
  }
  return context;
};

function ContextOriginParentTrigger({
  children,
  originParentTriggerRef,
}: ContextOriginParentTriggerProps) {
  const value = { originParentTriggerRef };

  return (
    <OriginParentTriggerContext.Provider value={value}>
      {children}
    </OriginParentTriggerContext.Provider>
  );
}

export default ContextOriginParentTrigger;
