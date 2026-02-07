import { useEffect } from "react";

export function useDisableScroll(show: boolean) {
  useEffect(() => {
    function preventDefault(e: WheelEvent | TouchEvent) {
      e.preventDefault();
    }
    const wheelOpt = { passive: false };
    function preventKeyScroll(e: KeyboardEvent) {
      const keys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Space",
        "PageUp",
        "PageDown",
        "Home",
        "End",
      ];
      if (keys.indexOf(e.code) !== -1) {
        e.preventDefault();
      }
    }
    if (show) {
      document.body.addEventListener("wheel", preventDefault, wheelOpt);
      document.body.addEventListener("touchmove", preventDefault, wheelOpt);
      document.body.addEventListener("keydown", preventKeyScroll);
    }
    return () => {
      document.body.removeEventListener("wheel", preventDefault);
      document.body.removeEventListener("touchmove", preventDefault);

      document.body.removeEventListener("keydown", preventKeyScroll);
    };
  }, [show]);
}
