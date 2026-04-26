import React, { RefObject, useEffect, useRef, useState } from "react";
import debounce from "../debounce";
import { useMediaAudioFullContext } from "@/Context/ContextMediaAudioFull";
interface isOverFlowProp {
  duration: number;
  clientWidth: number;
}
const useOverflowCheck = (
  element: RefObject<HTMLDivElement | null>,
): [
  isOverFlowProp,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<isOverFlowProp>>,
  RefObject<number>,
] => {
  const [isOverFlow, setIsOverFlow] = useState({
    duration: 0,
    clientWidth: 0,
  });
  const { open } = useMediaAudioFullContext();
  const animateItterateRef = useRef(1);
  const [animate, setanimatie] = useState(true);
  const previousWidth = useRef(0);
  useEffect(() => {
    const checkOverflow = () => {
      if (open) return;
      const fullWidth = element.current!.scrollWidth;
      const showWidth = element.current!.clientWidth;
      if (fullWidth > showWidth) {
        const overFlowWidth = ((fullWidth - showWidth) * showWidth) / 4;
        previousWidth.current = showWidth;
        setIsOverFlow({
          duration: overFlowWidth,
          clientWidth: showWidth,
        });
        setanimatie(true);
      }
    };
    checkOverflow();
    const debounceResize = debounce((entries: ResizeObserverEntry[]) => {
      if (open) return;
      for (const entry of entries) {
        const clientWidth = Math.round(entry.contentRect.width);
        if (clientWidth !== previousWidth.current) {
          //reset two animation track ref
          animateItterateRef.current = 1;
          setanimatie(false);
        }
      }
    }, 150);
    const observer = new ResizeObserver(debounceResize);
    observer.observe(element!.current!);

    return () => {
      observer.disconnect();
    };
  }, [element, isOverFlow.clientWidth, isOverFlow.duration, open]);
  return [isOverFlow, animate, setanimatie, setIsOverFlow, animateItterateRef];
};
export default useOverflowCheck;
