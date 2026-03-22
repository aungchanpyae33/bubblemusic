"use client";
import React, { RefObject, useRef } from "react";
import { twMerge } from "tailwind-merge";
import useSetFocusMounted from "@/lib/CustomHooks/useSetFocusMounted";
import { FocusTrap } from "focus-trap-react";
import useCloseFunctoion from "@/lib/CustomHooks/useCloseFunction";
import { closeModalBox } from "@/lib/closeModalBox";

interface SubOpenToggleProps<T> extends React.ComponentProps<"div"> {
  /** Zustand selector type */
  selector: (state: never) => T;
  useStore: (selector: (state: never) => T) => T;
  originParentTriggerRef: RefObject<HTMLElement | null>;
  children: React.ReactNode;
}
const baseStyle =
  "z-50 bg-pop p-3 rounded-md border border-borderFull w-[480px] absolute max-h-[95vh] overflow-y-auto  top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]";
function SubOpenToggle<T>({
  children,
  selector,
  useStore,
  originParentTriggerRef,
  className,
}: SubOpenToggleProps<T>) {
  const zustandModalBoxFn = useStore(selector) as (value: unknown) => void;
  const refFocus = useRef<HTMLDivElement>(null);
  useCloseFunctoion(
    true,
    () => zustandModalBoxFn(undefined),
    refFocus,
    originParentTriggerRef,
  );
  useSetFocusMounted({ refFocus: refFocus });
  return (
    <div
      className=" fixed  inset-0 z-50 bg-overlay"
      onClick={() => {
        closeModalBox(zustandModalBoxFn, originParentTriggerRef);
      }}
    >
      <FocusTrap
        focusTrapOptions={{
          allowOutsideClick: true,
        }}
      >
        <div
          tabIndex={0}
          ref={refFocus}
          className={twMerge(baseStyle, className)}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </FocusTrap>
    </div>
  );
}

export default SubOpenToggle;
