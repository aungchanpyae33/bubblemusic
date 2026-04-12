import { Suspense } from "react";
import NotFoundWrapper from "./NotFoundWrapper";
import NotFoundTextLoading from "../loading/NotFoundTextLoading";
import { GlobalNotFoundIcon } from "../CustomIcon/Icon";
import AppWrapper from "../general/SideEffectPageWrapper/AppWrapper";

function AppNotFound() {
  return (
    <AppWrapper>
      <GlobalNotFoundIcon className=" text-ink-400" />
      <Suspense fallback={<NotFoundTextLoading />}>
        <NotFoundWrapper />
      </Suspense>
    </AppWrapper>
  );
}

export default AppNotFound;
