"use client";
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import ContextGoToRelative, {
  GoToRelativeContextValue,
} from "./ContextGoToRelative";
import type { MediaItemType } from "../../database.types-fest";

interface MoreOptionContextProps {
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
}

interface ContextMoreOptionProps {
  children: ReactNode;
  relative?: GoToRelativeContextValue["relative"];
  type?: MediaItemType;
}
const MoreOptionContext = createContext<MoreOptionContextProps | undefined>(
  undefined,
);

export const useMoreOptionContext = () => {
  const context = useContext(MoreOptionContext);
  if (context === undefined) {
    throw new Error(
      "useMoreOptionContext must be used within a MoreOptionContext.Provider",
    );
  }
  return context;
};

function ContextMoreOption({
  children,
  relative,
  type,
}: ContextMoreOptionProps) {
  const [show, setShow] = useState(false);
  const value = { show, setShow };

  return (
    <MoreOptionContext.Provider value={value}>
      <ContextGoToRelative relative={relative} type={type}>
        {children}
      </ContextGoToRelative>
    </MoreOptionContext.Provider>
  );
}

export default ContextMoreOption;
