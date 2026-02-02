"use client";
import { useContext, useRef } from "react";
import { ContextMoreOption } from "./MoreOptionContext";
import { createPortal } from "react-dom";
import MoreOptionStackContext from "./MoreOptionStackContext";
import MoreOptionUniqueContext from "./MoreOptionUniqueContext";
import ToggleContent from "./ToggleContent";
import { useDisableScroll } from "@/lib/CustomHooks/useDisableScroll";
interface MoreOptionProps extends React.ComponentProps<"div"> {
  targetElement: React.ReactNode;
  triggerEl: React.ReactNode;
  relativeRoot?: HTMLDivElement | null;
  staticDrop?: boolean;
  staticUp?: boolean;
}
function MoreOption({
  className,
  triggerEl,
  targetElement,
  relativeRoot,
  staticDrop,
  staticUp,
}: MoreOptionProps) {
  const { show, setShow } = useContext(ContextMoreOption);
  const parentRef = useRef<HTMLButtonElement>(null);
  useDisableScroll(show);
  return (
    <div>
      <button
        ref={parentRef}
        onClick={() => {
          setShow(!show);
        }}
        className={`w-full h-full flex justify-center ${className}`}
      >
        {triggerEl}
      </button>

      {show && (
        <>
          {createPortal(
            // stack provider for all child from one parent lvl
            <MoreOptionStackContext>
              <MoreOptionUniqueContext>
                <ToggleContent
                  staticUp={staticUp}
                  staticDrop={staticDrop}
                  parentRef={parentRef}
                >
                  {targetElement}
                </ToggleContent>
              </MoreOptionUniqueContext>
            </MoreOptionStackContext>,
            relativeRoot ? relativeRoot : document.body,
          )}
        </>
      )}
    </div>
  );
}
export default MoreOption;
