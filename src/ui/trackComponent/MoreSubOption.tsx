"use client";
import { useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import MoreOptionUniqueContext from "./MoreOptionUniqueContext";
import useTriggerButtonSub from "@/lib/CustomHooks/useTriggerButtonSub";
import ToggleSubContent from "./ToggleSubContent";
import { useDisableScroll } from "@/lib/CustomHooks/useDisableScroll";
import { generateUUID } from "@/lib/GenerateUUID";
interface MoreOptionProps extends React.ComponentProps<"button"> {
  targetElement: React.ReactNode;
  triggerEl: React.ReactNode;
  relativeRoot?: HTMLDivElement | null;
  stackNum: number;
}
function MoreSubOption({
  className,
  targetElement,
  triggerEl,
  relativeRoot,
  stackNum,
}: MoreOptionProps) {
  const parentRef = useRef<HTMLButtonElement>(null);
  const uuid = useMemo(() => generateUUID(), []);
  const [stayShow] = useTriggerButtonSub(parentRef, stackNum, uuid);
  useDisableScroll(stayShow);
  return (
    <div>
      <button
        ref={parentRef}
        className={clsx(`w-full h-full flex justify-center ${className}`, {
          "bg-[#444444]": stayShow,
        })}
      >
        {triggerEl}
      </button>

      {stayShow && (
        <>
          {createPortal(
            <MoreOptionUniqueContext>
              <ToggleSubContent
                stayShow={stayShow}
                parentRef={parentRef}
                stackNum={stackNum}
              >
                {targetElement}
              </ToggleSubContent>
            </MoreOptionUniqueContext>,
            relativeRoot ? relativeRoot : document.body,
          )}
        </>
      )}
    </div>
  );
}
export default MoreSubOption;
