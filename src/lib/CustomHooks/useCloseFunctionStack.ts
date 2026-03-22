import { useMoreOptionStackContext } from "@/Context/ContextMoreOptionStack";
import { RefObject, useEffect, useRef } from "react";

// this function do close the portal when escape is pressed
function useCloseFunctoionStack(
  value: boolean,
  containerRef: RefObject<HTMLElement | null>,
) {
  const lastFocusElRef = useRef<HTMLElement | null>(null);
  const { stack, setStack } = useMoreOptionStackContext();

  useEffect(() => {
    if (value) {
      // only save the element once
      if (lastFocusElRef.current) return;
      lastFocusElRef.current = document.activeElement as HTMLElement | null;
    } else {
      lastFocusElRef.current = null; // clean up
    }
  }, [value]);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;
    function closeSearch(e: KeyboardEvent) {
      if (e.key === "Escape" && value === true) {
        e.preventDefault();
        e.stopPropagation();

        const newStack = Math.max(0, stack - 1);
        setStack(newStack);
        // Restore focus to lastOpen element
        if (lastFocusElRef.current) {
          lastFocusElRef.current.focus();
        }
      }
    }

    if (value) {
      containerEl.addEventListener("keydown", closeSearch);
    }

    return () => {
      containerEl.removeEventListener("keydown", closeSearch);
    };
  }, [value, stack, setStack, containerRef]);
}

export default useCloseFunctoionStack;
