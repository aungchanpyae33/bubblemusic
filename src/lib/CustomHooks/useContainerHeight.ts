// hooks/useContainerHeight.ts
import { useState, RefObject, useEffect } from "react";
import debounce from "../debounce";

export function useContainerHeight(
  containerHeightRef: RefObject<HTMLElement | null>,
) {
  const [height, setHeight] = useState(0);

  // Initial measurement + ResizeObserver (only updates on actual height change)
  useEffect(() => {
    const el = containerHeightRef.current;
    if (!el) return;
    const height = el.getBoundingClientRect().height;
    // Initial value
    setHeight(height);

    const debounceHeightResize = debounce((entries: ResizeObserverEntry[]) => {
      const newHeight = entries[0]?.contentRect.height ?? 0;
      if (newHeight !== 0 && newHeight !== height) {
        setHeight(newHeight);
      }
    }, 200);
    const observer = new ResizeObserver(debounceHeightResize);

    observer.observe(el);

    return () => observer.disconnect();
  }, [containerHeightRef]);

  return height;
}
