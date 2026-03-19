import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import debounce from "../debounce";

const passiveOption: AddEventListenerOptions & EventListenerOptions = {
  passive: true,
};
export const useVirtuosoLoader = ({
  containerRef,
  length,
}: {
  containerRef: RefObject<HTMLElement | null>;
  length: number;
}) => {
  const [count, setCount] = useState(0);
  const getCount = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!container) return;

    const clientHeight = container.clientHeight;
    const itemHeight = 62;
    const maxItem = Math.ceil(clientHeight / itemHeight) + 1;
    const autualItem = length;
    const countData = Math.min(autualItem, maxItem);
    setCount(countData);
  }, [containerRef, length]);

  useEffect(() => {
    const debounceGetCount = debounce(getCount, 500);
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", debounceGetCount, passiveOption);
    return () => {
      container.removeEventListener("scroll", debounceGetCount, passiveOption);
    };
  }, [containerRef, getCount]);
  useLayoutEffect(() => {
    getCount();
  }, [getCount, length]);
  return [count];
};
