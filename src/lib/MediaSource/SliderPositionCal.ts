import React, { RefObject } from "react";

interface sliderPositionCalprop {
  sliderRef: RefObject<HTMLDivElement | null>;
  e: PointerEvent | React.PointerEvent;
}
const getClientX = (e: PointerEvent | React.PointerEvent): number => {
  return e.clientX;
};
export const seekCal = ({ sliderRef, e }: sliderPositionCalprop) => {
  const rect = sliderRef!.current!.getBoundingClientRect();
  const offset = getClientX(e) - rect.left;

  return Math.min(Math.max(offset / rect.width, 0), 1);
};
export const sliderPositionCal = ({ sliderRef, e }: sliderPositionCalprop) => {
  const per = seekCal({ sliderRef, e });
  const percentage = per * 100;
  return { percentage: 100 - percentage, seekCalReturn: per };
};
