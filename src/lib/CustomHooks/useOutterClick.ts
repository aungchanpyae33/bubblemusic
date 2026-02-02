import { ContextMoreOptionStack } from "@/ui/trackComponent/MoreOptionStackContext";
import { ContextMoreOptionUnique } from "@/ui/trackComponent/MoreOptionUniqueContext";
import React, { RefObject, useContext, useEffect } from "react";
// this function handles clicks outside the component to close it , and ignore the click inside ignoreRef and parent(trigger button) and it only used for parent component

function useOutterClick(
  value: boolean,
  fun: React.Dispatch<React.SetStateAction<boolean>>,
  parentElement: RefObject<HTMLButtonElement | null>,
  ignoreRef: RefObject<HTMLDivElement | null>,
) {
  // reset stack to 0 when clicked inside the parent element
  //close the component when clicked outside the parent element by checking contains method
  const { setStack } = useContext(ContextMoreOptionStack);
  // reset unique uuid state when clicked inside the parent element
  const { setUuidState } = useContext(ContextMoreOptionUnique);
  useEffect(() => {
    const container = ignoreRef.current;
    if (!container) return;
    function OutterClickFunction(e: MouseEvent) {
      if (
        !parentElement!.current!.contains(e.target as Node) &&
        !ignoreRef?.current?.contains(e.target as HTMLElement)
      ) {
        fun(false);
      } else {
        setUuidState("");
        setStack(0);
      }
    }
    if (value) {
      document.addEventListener("click", OutterClickFunction);
    }

    return () => {
      document.removeEventListener("click", OutterClickFunction);
    };
  }, [value, fun, parentElement, ignoreRef, setStack, setUuidState]);
}

export default useOutterClick;
