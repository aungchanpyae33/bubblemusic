import { Suspense } from "react";
import { GlobalNotFoundIcon } from "../CustomIcon/Icon";
import SubAppWrapper from "../general/SideEffectPageWrapper/SubAppWrapper";
import NotFoundTextLoading from "../loading/NotFoundTextLoading";
import NotFoundWrapper from "./NotFoundWrapper";

function SubNotFound() {
  return (
    <SubAppWrapper>
      <GlobalNotFoundIcon className=" text-ink-400" />
      <Suspense fallback={<NotFoundTextLoading />}>
        <NotFoundWrapper />
      </Suspense>
    </SubAppWrapper>
  );
}

export default SubNotFound;
