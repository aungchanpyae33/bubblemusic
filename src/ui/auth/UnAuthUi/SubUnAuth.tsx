import { GlobalUnAuth } from "@/ui/CustomIcon/Icon";
import SubAppWrapper from "@/ui/general/SideEffectPageWrapper/SubAppWrapper";
import UnAuthResponseWrapper from "./UnAuthResponseWrapper";

function SubUnAuth() {
  return (
    <SubAppWrapper>
      <GlobalUnAuth className=" text-ink-400" />

      <UnAuthResponseWrapper />
    </SubAppWrapper>
  );
}

export default SubUnAuth;
