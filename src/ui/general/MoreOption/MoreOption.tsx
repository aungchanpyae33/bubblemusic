"use client";
import { useRef } from "react";
import { createPortal } from "react-dom";
import ToggleContent from "./ToggleContent";
import { useDisableScroll } from "@/lib/CustomHooks/useDisableScroll";
import { useMoreOptionContext } from "@/Context/ContextMoreOption";
import ContextMoreOptionUnique from "@/Context/ContextMoreOptionUnique";
import ContextMoreOptionStack from "@/Context/ContextMoreOptionStack";
import ContextOriginParentTrigger from "@/Context/ContextOriginParentTrigger";
interface MoreOptionProps extends React.ComponentProps<"div"> {
  targetElement: React.ReactNode;
  triggerEl: React.ReactNode;
  staticDrop?: boolean;
  staticUp?: boolean;
}
function MoreOption({
  className,
  triggerEl,
  targetElement,
  staticDrop,
  staticUp,
}: MoreOptionProps) {
  const { show, setShow } = useMoreOptionContext();
  const parentRef = useRef<HTMLButtonElement>(null);
  useDisableScroll(show);
  return (
    <div>
      <button
        ref={parentRef}
        onClick={() => {
          setShow(!show);
        }}
        className={`w-full h-full  flex justify-center ${className}`}
      >
        {triggerEl}
      </button>

      {show && (
        <>
          {createPortal(
            <ContextOriginParentTrigger originParentTriggerRef={parentRef}>
              {/* stack provider for all child from one parent lvl */}
              <ContextMoreOptionStack>
                <ContextMoreOptionUnique>
                  <ToggleContent
                    staticUp={staticUp}
                    staticDrop={staticDrop}
                    parentRef={parentRef}
                  >
                    {targetElement}
                  </ToggleContent>
                </ContextMoreOptionUnique>
              </ContextMoreOptionStack>
            </ContextOriginParentTrigger>,
            document.body,
          )}
        </>
      )}
    </div>
  );
}
export default MoreOption;
