import React, { RefObject, useContext, useEffect } from "react";
import { DeviceContext } from "../DeviceContext/ContextDeviceCheck";
import { ContextMoreOptionStack } from "@/ui/trackComponent/MoreOptionStackContext";
import { ContextMoreOptionUnique } from "@/ui/trackComponent/MoreOptionUniqueContext";

// this function do close the portal when escape is pressed , it also manage the stack for inner child components
function useCloseFunctoion(
  value: boolean,
  fun:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((value: boolean) => void),
  closeElement?: RefObject<HTMLButtonElement | null>,
) {
  const { device } = useContext(DeviceContext);
  const { stack, setStack } = useContext(ContextMoreOptionStack);
  const { setUuidState } = useContext(ContextMoreOptionUnique);
  // stack are 0 === parent , 1 === child , 2 === grand child etc..
  useEffect(() => {
    function closeSearch(e: KeyboardEvent) {
      if (e.key === "Escape" && value === true) {
        e.preventDefault();

        if (device === "mobile") {
          // on mobile just close all stack
          setStack(0);
          fun(false);
          return;
        }

        // stack === 0 means it is the parent component
        // i use open (boolean) only  for parent , inner child state are paired with stack number
        if (stack === 0) {
          fun(false);
          if (!closeElement) return;
          closeElement.current!.focus();
        }

        // decrease the stack count because of clicking triiger
        const newStack = Math.max(0, stack - 1);
        setStack(newStack);
      }
    }
    if (value) {
      window.addEventListener("keydown", closeSearch);
    }

    return () => {
      window.removeEventListener("keydown", closeSearch);
    };
  }, [value, fun, closeElement, stack, setStack, setUuidState, device]);
}

export default useCloseFunctoion;
