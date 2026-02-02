import { ContextMoreOptionStack } from "@/ui/trackComponent/MoreOptionStackContext";
import { ContextMoreOptionUnique } from "@/ui/trackComponent/MoreOptionUniqueContext";
import { useContext, useEffect } from "react";
import { isTouchPointer } from "../isTouchPointer";

function useTriggerButtonSub(
  parentRef: React.RefObject<HTMLButtonElement | null>,
  stackNum: number,
  uuid: string,
) {
  const { stack, setStack } = useContext(ContextMoreOptionStack);
  const { uuidState, setUuidState } = useContext(ContextMoreOptionUnique);

  useEffect(() => {
    const triggerBtn = parentRef.current;
    if (!triggerBtn) return;
    function ToggleFn(e: MouseEvent) {
      // to stop the trigger to the parent outterClick
      e.stopImmediatePropagation();
      // toggle
      if (stackNum === stack && uuid === uuidState) {
        setStack(stackNum - 1);
        setUuidState("");
      } else {
        setStack(stackNum);
        setUuidState(uuid);
      }
    }

    function OpenFn(e: PointerEvent) {
      e.stopImmediatePropagation();
      if (isTouchPointer(e)) return;
      // toggle
      setStack(stackNum);
      setUuidState(uuid);
    }

    triggerBtn.addEventListener("pointerenter", OpenFn);
    triggerBtn.addEventListener("click", ToggleFn);
    return () => {
      triggerBtn.removeEventListener("pointerenter", OpenFn);
      triggerBtn.removeEventListener("click", ToggleFn);
    };
  }, [setStack, stackNum, parentRef, uuid, uuidState, setUuidState, stack]);

  return [stackNum <= stack && uuid === uuidState];
}

export default useTriggerButtonSub;
