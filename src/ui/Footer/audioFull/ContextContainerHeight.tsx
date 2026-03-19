import { useContainerHeight } from "@/lib/CustomHooks/useContainerHeight";
import { createContext, ReactNode, RefObject, useContext } from "react";

interface ContainerHeightContextProps {
  height: number;
}
const ContainerHeightContext = createContext<
  ContainerHeightContextProps | undefined
>(undefined);

export const useContainerHeightContext = () => {
  const context = useContext(ContainerHeightContext);
  if (context === undefined) {
    throw new Error(
      "useContainerHeightContext must be used within a ContainerHeightContext.Provider",
    );
  }
  return context;
};

function ContextContainerHeight({
  children,
  containerHeightRef,
}: {
  children: ReactNode;
  containerHeightRef: RefObject<HTMLElement | null>;
}) {
  const height = useContainerHeight(containerHeightRef);
  const value = { height };
  return (
    <ContainerHeightContext.Provider value={value}>
      {children}
    </ContainerHeightContext.Provider>
  );
}

export default ContextContainerHeight;
