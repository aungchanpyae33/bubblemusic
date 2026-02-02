import { ContextMoreOptionStack } from "@/ui/trackComponent/MoreOptionStackContext";
import { RefObject, useContext, useEffect } from "react";

// this function handles clicks inside the sub component to manage the stack , it does not manage the outter click of main parent element
function useOutterClickSub(
  portalElRef: RefObject<HTMLDivElement | null>,
  stackNum: number,
  isMobile?: boolean,
) {
  const { stack, setStack } = useContext(ContextMoreOptionStack);
  // stack are 0 === parent , 1 === child , 2 === grand child etc..
  //toggle sub content (open,close) based on stack number
  useEffect(() => {
    const copyRef = portalElRef.current;
    if (!copyRef) return;
    function OutterClickFunction(e: MouseEvent) {
      // to stop the trigger to the parent outterClick
      if (e.target !== e.currentTarget) return;
      e.stopPropagation();
      if (stack > stackNum) {
        // by setting stack of the current click portal, it can be determined which sub portal should be open or close(eg: when clicking stack 2 portal , parent stack 1 should not be closed, but when stack 2 portal is open and clicking stack 1 portal , stack 2 should be closed)
        setStack(stackNum);
      }
    }

    copyRef.addEventListener("click", OutterClickFunction);
    return () => {
      copyRef.removeEventListener("click", OutterClickFunction);
    };
  }, [portalElRef, stack, setStack, stackNum, isMobile]);
}

export default useOutterClickSub;
