import { GlobalError } from "@/ui/CustomIcon/Icon";
import AppWrapper from "@/ui/general/SideEffectPageWrapper/AppWrapper";
import ErrorWrapper from "./ErrorWrapper";

function AppError({ reset }: { reset: () => void }) {
  return (
    <AppWrapper>
      <GlobalError className=" text-ink-400" />
      <ErrorWrapper reset={reset} />
    </AppWrapper>
  );
}

export default AppError;
