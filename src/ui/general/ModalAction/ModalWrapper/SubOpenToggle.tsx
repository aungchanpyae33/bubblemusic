"use client";
import React, { RefObject, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { FocusTrap } from "focus-trap-react";
import useCloseFunctoion from "@/lib/CustomHooks/useCloseFunction";
import { closeModalBox } from "@/lib/closeModalBox";
import IconWrapper from "../../IconWrapper";
import { X } from "lucide-react";
import Button from "@/components/button/Button";

interface SubOpenToggleProps<T> extends React.ComponentProps<"div"> {
  /** Zustand selector type */
  selector: (state: never) => T;
  useStore: (selector: (state: never) => T) => T;
  headerText?: string;
  originParentTriggerRef?: RefObject<HTMLElement | null>;
  children: React.ReactNode;
}
const baseStyle =
  "z-50  bg-pop p-3 rounded-md border border-borderFull w-[96%] max-w-[480px]  absolute max-h-[95vh] overflow-y-auto  top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]";
function SubOpenToggle<T>({
  children,
  selector,
  useStore,
  headerText,
  originParentTriggerRef,
  className,
}: SubOpenToggleProps<T>) {
  const zustandModalBoxFn = useStore(selector) as (value: unknown) => void;
  const refFocus = useRef<HTMLDivElement>(null);

  useCloseFunctoion(true, () => zustandModalBoxFn(undefined), refFocus);
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
          setReturnFocus: originParentTriggerRef?.current ?? undefined,
        }}
      >
        <div
          tabIndex={-1}
          ref={refFocus}
          className={twMerge(baseStyle, className)}
          onClick={(e) => e.stopPropagation()}
        >
          {headerText && (
            <div className="relative flex w-full justify-between  items-center mb-4">
              <h3 className="text-lg font-semibold">{headerText}</h3>

              <Button
                className="rounded-full"
                onClick={() => {
                  closeModalBox(zustandModalBoxFn, originParentTriggerRef);
                }}
              >
                <IconWrapper size="large" Icon={X} />
              </Button>
            </div>
          )}

          {children}
        </div>
      </FocusTrap>
    </div>
  );
}

export default SubOpenToggle;
