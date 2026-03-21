import { useMoreOptionStackContext } from "@/Context/ContextMoreOptionStack";
import React, { RefObject, useEffect } from "react";
// this function do close the portal when escape is pressed , it also manage the stack for inner child components
function useCloseFunctoionStack(
  value: boolean,
  fun:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((value: boolean) => void),
  closeElement?: RefObject<HTMLButtonElement | null>,
) {
  const { stack, setStack } = useMoreOptionStackContext();

  // stack are 0 === parent , 1 === child , 2 === grand child etc..
  useEffect(() => {
    function closeSearch(e: KeyboardEvent) {
      if (e.key === "Escape" && value === true) {
        e.preventDefault();

        // stack === 0 means it is the parent component
        // i use open (boolean) only  for parent , inner child state are paired with stack number
        if (stack === 0) {
          fun(false);
          if (!closeElement) return;
          closeElement.current!.focus();
          return;
        }

        // decrease the stack count because of clicking triiger
        const newStack = Math.max(0, stack - 1);
        setStack(newStack);
      }
    }
    if (value) {
      document.body.addEventListener("keydown", closeSearch);
    }

    return () => {
      document.body.removeEventListener("keydown", closeSearch);
    };
  }, [value, fun, closeElement, stack, setStack]);
}

export default useCloseFunctoionStack;
