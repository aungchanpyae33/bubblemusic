import { ContextMoreOptionStack } from "@/ui/trackComponent/MoreOptionStackContext";
import { ContextMoreOptionUnique } from "@/ui/trackComponent/MoreOptionUniqueContext";
import React, { RefObject, useContext, useEffect } from "react";

// this function handles clicks outside the component to close it

function useOutterClick(
  value: boolean,
  fun: React.Dispatch<React.SetStateAction<boolean>>,
  ignoreRef: RefObject<HTMLDivElement | null>,
  parentRef: RefObject<HTMLButtonElement | null>,
) {
  const { setStack } = useContext(ContextMoreOptionStack);

  const { setUuidState } = useContext(ContextMoreOptionUnique);
  // if it pass to reach it , it is outside click
  useEffect(() => {
    function OutterClickFunction(e: MouseEvent) {
      const target = e.target as Node | null;

      if (!parentRef.current || !target) return;
      if (parentRef.current?.contains(target)) return;
      fun(false);
    }
    if (value) {
      document.body.addEventListener("click", OutterClickFunction);
    }

    return () => {
      document.body.removeEventListener("click", OutterClickFunction);
    };
  }, [fun, parentRef, value]);

  // handle toggle content click ,
  useEffect(() => {
    const copyRef = ignoreRef.current;
    if (!copyRef) return;
    function Close(e: MouseEvent) {
      if (e.target === e.currentTarget) {
        e.stopPropagation();
        setUuidState("");
        setStack(0);
      }
    }
    copyRef.addEventListener("click", Close);
    return () => {
      copyRef.removeEventListener("click", Close);
    };
  }, [ignoreRef, setStack, setUuidState]);
}

export default useOutterClick;
