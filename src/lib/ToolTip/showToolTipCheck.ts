import React, { RefObject } from "react";

import { pointerPosition } from "@/ui/general/ToolTip";
import type { tooltipState } from "../CustomHooks/useTooltipOverflow";
interface closeTooltipProp {
  setTimeoutRef: RefObject<ReturnType<typeof setTimeout> | null>;
  tooltipShow: tooltipState;
  setTooltipShow: React.Dispatch<React.SetStateAction<tooltipState>>;
}
export function closeTooltip({
  setTimeoutRef,
  tooltipShow,
  setTooltipShow,
}: closeTooltipProp) {
  if (setTimeoutRef.current) {
    clearTimeout(setTimeoutRef.current);
    setTimeoutRef.current = null;
  }
  if (tooltipShow.show) {
    setTooltipShow((pre) => ({
      ...pre,
      show: false,
    }));
  }
}

interface TooltipProps {
  setTimeoutRef: RefObject<ReturnType<typeof setTimeout> | null>;
  tooltipShow: tooltipState;
  setTooltipShow: React.Dispatch<React.SetStateAction<tooltipState>>;
  targetElement: HTMLDivElement;
  e: React.PointerEvent<HTMLDivElement>;
  delay: number;
  pointerPosition: RefObject<pointerPosition>;
}

export function isInside(
  targetElement: HTMLDivElement,
  pointerPosition: RefObject<pointerPosition>,
) {
  const x = pointerPosition!.current!.clientX;
  const y = pointerPosition!.current!.clientY;
  const rect = targetElement.getBoundingClientRect();
  // need to use updated value from pointer event , using e will give stale x and stale y
  const isPointerInsideForEnter =
    x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  return isPointerInsideForEnter;
}

export const showToolTipCheck = ({
  setTimeoutRef,
  tooltipShow,
  setTooltipShow,
  targetElement,
  e,
  delay,
  pointerPosition,
}: TooltipProps) => {
  const { clientX: x, clientY: y } = e;
  pointerPosition.current.clientX = x;
  pointerPosition.current.clientY = y;
  setTimeoutRef.current = setTimeout(() => {
    const isPointerInside = isInside(targetElement, pointerPosition);
    if (isPointerInside && !tooltipShow.show) {
      setTooltipShow((pre) => ({
        ...pre,
        show: true,
      }));
    } else {
      if (setTimeoutRef.current) {
        clearTimeout(setTimeoutRef.current);
        setTimeoutRef.current = null;
      }
    }
  }, delay);
};
