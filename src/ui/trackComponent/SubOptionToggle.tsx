"use client";
import React, { useRef } from "react";
import FocusTrap from "../Footer/audioFull/FocusTrap";
import { twMerge } from "tailwind-merge";
import useSetFocusMounted from "@/lib/CustomHooks/useSetFocusMounted";

interface SubOptionToggleProps<T> extends React.ComponentProps<"div"> {
  /** Zustand selector type */
  selector: (state: never) => T;
  useStore: (selector: (state: never) => T) => T;
  children: React.ReactNode;
}
const baseStyle =
  "z-50 bg-pop p-3 rounded-md border border-borderFull w-[400px] absolute max-h-[95vh] overflow-y-auto  top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]";
function SubOptionToggle<T>({
  children,
  selector,
  useStore,
  className,
}: SubOptionToggleProps<T>) {
  const addSongsToPlaylist = useStore(selector) as (value: unknown) => void;
  const refFocus = useRef<HTMLDivElement>(null);
  useSetFocusMounted({ refFocus: refFocus });
  return (
    <div
      className=" fixed  inset-0 z-50 bg-overlay"
      onClick={() => addSongsToPlaylist({})}
    >
      <FocusTrap refFocus={refFocus}>
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

export default SubOptionToggle;
