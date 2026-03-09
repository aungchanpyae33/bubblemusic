import React, { createContext, useContext } from "react";
// this is used for go to artist case like context provider for both list container and track
// it will use every more option three dots appear
// this data will be consume by go to artist component
export interface RelativeData {
  id: string;
  name: string;
}

export interface GoToRelativeContextValue {
  relative: RelativeData[] | RelativeData | undefined;
}

interface ContextGoToRelativeProps extends GoToRelativeContextValue {
  children: React.ReactNode;
}

export const GoToRelativeContext = createContext<
  GoToRelativeContextValue | undefined
>(undefined);

export const useGoToRelativeContext = () => {
  const context = useContext(GoToRelativeContext);
  if (context === undefined) {
    throw new Error(
      "useGoToRelativeContext must be used within a GoToRelativeContext.Provider",
    );
  }
  return context;
};

function ContextGoToRelative({ relative, children }: ContextGoToRelativeProps) {
  const value = { relative };
  return (
    <GoToRelativeContext.Provider value={value}>
      {children}
    </GoToRelativeContext.Provider>
  );
}

export default ContextGoToRelative;
