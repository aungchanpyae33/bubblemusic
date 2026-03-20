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
} from "../general/optionBox/ContextGoToRelative";
import type { MediaItemType } from "../../../database.types-fest";

interface ContextMoreOptionValue {
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
}

interface MoreOptionContextProps {
  children: ReactNode;
  relative?: GoToRelativeContextValue["relative"];
  type?: MediaItemType;
}
const ContextMoreOption = createContext<ContextMoreOptionValue | undefined>(
  undefined,
);

export const useMoreOptionContext = () => {
  const context = useContext(ContextMoreOption);
  if (context === undefined) {
    throw new Error(
      "useMoreOptionContext must be used within a ContextMoreOption.Provider",
    );
  }
  return context;
};

function MoreOptionContext({
  children,
  relative,
  type,
}: MoreOptionContextProps) {
  const [show, setShow] = useState(false);
  const value = { show, setShow };

  return (
    <ContextMoreOption.Provider value={value}>
      <ContextGoToRelative relative={relative} type={type}>
        {children}
      </ContextGoToRelative>
    </ContextMoreOption.Provider>
  );
}

export default MoreOptionContext;
