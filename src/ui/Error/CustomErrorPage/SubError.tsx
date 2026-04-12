import { GlobalError } from "@/ui/CustomIcon/Icon";
import ErrorWrapper from "./ErrorWrapper";
import SubAppWrapper from "@/ui/general/SideEffectPageWrapper/SubAppWrapper";

function SubError({ reset }: { reset: () => void }) {
  return (
    <SubAppWrapper>
      <GlobalError className=" text-ink-400" />
      <ErrorWrapper reset={reset} />
    </SubAppWrapper>
  );
}

export default SubError;
