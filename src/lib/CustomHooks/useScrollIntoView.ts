import { RefObject, useEffect } from "react";

export const useScrollIntoView = (
  isVisible: boolean,
  ref: RefObject<HTMLElement | null>,
) => {
  useEffect(() => {
    if (isVisible && ref.current) {
      ref.current.scrollIntoView({
        block: "nearest",
      });
    }
  }, [isVisible, ref]);
};
