import { RefObject, useEffect } from "react";

function useCloseFunctoion(
  value: boolean,
  onClose: () => void,
  containerRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl || !value) return;

    function closeSearch(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    }

    containerEl.addEventListener("keydown", closeSearch);

    return () => {
      containerEl.removeEventListener("keydown", closeSearch);
    };
  }, [value, onClose, containerRef]);
}

export default useCloseFunctoion;
