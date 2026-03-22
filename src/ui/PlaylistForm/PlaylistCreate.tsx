import { useMemo, useRef } from "react";
import useFocusOnOpen from "@/lib/CustomHooks/useFocusOnOpen";
import { useMoreOptionStackContext } from "@/Context/ContextMoreOptionStack";
import FocusTrap from "../general/FocusTrap";
import PlaylistCreateForm from "./PlaylistCreateForm";
import InitCreateButton from "./InitCreateButton";

function PlaylistCreate({ stackNum }: { stackNum: number }) {
  const { stack, setStack } = useMoreOptionStackContext();
  const formParentRef = useRef<HTMLDivElement>(null);
  // is it sub child permanant stack num is equl or less than current stack?
  const stayShow = useMemo(() => stackNum <= stack, [stack, stackNum]);
  useFocusOnOpen(stayShow, formParentRef);

  return (
    <>
      <InitCreateButton stackNum={stackNum} />
      {stayShow && (
        <div
          className="fixed   w-screen    h-screen inset-0 z-40"
          onClick={() => setStack(stackNum - 1)}
        >
          <FocusTrap refFocus={formParentRef}>
            <div
              tabIndex={0}
              ref={formParentRef}
              className="absolute   top-[50%] left-[50%] -translate-x-[50%] bg-pop p-3 rounded-md border border-borderFull -translate-y-[50%]  max-w-[480px] w-[94%]"
              onClick={(e) => e.stopPropagation()}
            >
              <PlaylistCreateForm />
            </div>
          </FocusTrap>
        </div>
      )}
    </>
  );
}

export default PlaylistCreate;
