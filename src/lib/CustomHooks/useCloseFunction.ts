import { RefObject, useEffect, useRef } from "react";

function useCloseFunctoion(
  value: boolean,
  onClose: () => void,
  containerRef: RefObject<HTMLElement | null>,
  originParentTriggerRef?: RefObject<HTMLElement | null>,
) {
  const lastFocusElRef = useRef<HTMLElement | null>(null);

  //  Save the element that had focus RIGHT when  open
  //    (this runs BEFORE useFocusOnOpen || useSetFocusOnMount as swap the order of hooks)
  useEffect(() => {
    const originParentTriggerEl = originParentTriggerRef?.current;
    if (originParentTriggerEl) {
      lastFocusElRef.current = originParentTriggerEl;
      return;
    }
    if (value) {
      // only save the element once
      if (lastFocusElRef.current) return;
      lastFocusElRef.current = document.activeElement as HTMLElement | null;
    }

    return () => {
      lastFocusElRef.current = null;
    };
  }, [value, originParentTriggerRef]);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl || !value) return;

    function closeSearch(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();

        // Restore focus to lastOpen element
        if (lastFocusElRef.current) {
          lastFocusElRef.current.focus();
        }
      }
    }

    containerEl.addEventListener("keydown", closeSearch);

    return () => {
      containerEl.removeEventListener("keydown", closeSearch);
    };
  }, [value, onClose, containerRef]);
}

export default useCloseFunctoion;
