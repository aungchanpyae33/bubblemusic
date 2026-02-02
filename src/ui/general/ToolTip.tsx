"use client";
import { closeTooltip, showToolTipCheck } from "@/lib/ToolTip/showToolTipCheck";
import clsx from "clsx";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import LeadingRelax from "./LeadingRelax";
import useTooltipOverflow from "@/lib/CustomHooks/useTooltipOverflow";
import { isTouchPointer } from "@/lib/isTouchPointer";

export interface pointerPosition {
  clientX: number;
  clientY: number;
}
function ToolTip({
  children,
  tooltipContent,
}: {
  children: ReactNode;
  tooltipContent: string;
}) {
  const toolTipRef = useRef<HTMLDivElement | null>(null);
  const tooltipTargetRef = useRef<HTMLDivElement | null>(null);
  const pointerPosition = useRef<pointerPosition>({
    clientX: 0,
    clientY: 0,
  });
  const [tooltipShow, setTooltipShow] = useTooltipOverflow({
    toolTipRef,
    tooltipTargetRef,
  });
  const setTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // onWheel in ReactComponent is not trigger in sometimes as it is passive true by default. so use addeventlistener
  useEffect(() => {
    function closeTooltipFn() {
      closeTooltip({
        setTimeoutRef,
        tooltipShow,
        setTooltipShow,
      });
    }
    const toolTipRefCopy = tooltipTargetRef!.current!;
    if (tooltipShow.show) {
      toolTipRefCopy.addEventListener("wheel", closeTooltipFn, {
        passive: false,
      });
    }

    return () => {
      toolTipRefCopy.removeEventListener("wheel", closeTooltipFn);
    };
  }, [setTooltipShow, tooltipShow]);

  return (
    <div className="group relative w-fit max-w-full cursor-pointer">
      <div
        ref={tooltipTargetRef}
        onPointerEnter={(e) => {
          if (isTouchPointer(e)) return;
          const targetElement = e.currentTarget;
          if (!setTimeoutRef.current) {
            showToolTipCheck({
              setTimeoutRef,
              tooltipShow,
              setTooltipShow,
              targetElement,
              e,
              delay: 800,
              pointerPosition,
            });
          }
        }}
        // need to update pointePosition to use for  the function setTimeout
        onPointerMove={(e) => {
          if (isTouchPointer(e)) return;
          const { clientX: x, clientY: y } = e;
          pointerPosition.current.clientX = x;
          pointerPosition.current.clientY = y;
        }}
        //{...} is used to inset js expression ,
        // {...(tooltipShow.show && {
        //   onWheel: (e) => {
        //  above comment is for the past idea to add onwheel on condition
        onPointerLeave={(e) => {
          if (isTouchPointer(e)) return;
          closeTooltip({
            setTimeoutRef,
            tooltipShow,
            setTooltipShow,
          });
        }}
        className=" truncate"
      >
        {children}
      </div>

      {tooltipShow.show &&
        createPortal(
          <div
            className={clsx(
              "fixed max-w-[450px] z-30 md:max-w-[550px] w-max  pointer-events-none px-2 p-1 text-sm bg-[#2A2A2A] border border-divided  shadow-[0_4px_8px_rgba(0,0,0,0.3)]",
            )}
            ref={toolTipRef}
            style={tooltipShow.toolTipPosition}
          >
            <LeadingRelax>{tooltipContent}</LeadingRelax>
          </div>,
          document.body,
        )}
    </div>
  );
}

export default ToolTip;
