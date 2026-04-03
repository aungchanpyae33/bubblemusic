import UnAuthResponseWrapper from "@/ui/auth/UnAuthUi/UnAuthResponseWrapper";
import { GlobalUnAuth } from "@/ui/CustomIcon/Icon";

function Unauthorized() {
  return (
    <div className="flex flex-col gap-3 justify-center items-center h-96 p-14">
      <GlobalUnAuth className=" text-ink-400" />

      <UnAuthResponseWrapper />
    </div>
  );
}

export default Unauthorized;
