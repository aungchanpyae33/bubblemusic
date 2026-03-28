import { GlobalNotFoundIcon } from "@/ui/CustomIcon/Icon";
import NotFoundTextLoading from "@/ui/loading/NotFoundTextLoading";
import NotFoundWrapper from "@/ui/NotFoundPage/NotFoundWrapper";

import { Suspense } from "react";

export default function NotFoundPage() {
  return (
    <div className=" flex gap-3 flex-col justify-center  min-h-screen max-h-screen items-center ">
      <GlobalNotFoundIcon className=" text-ink-400" />

      <Suspense fallback={<NotFoundTextLoading />}>
        <NotFoundWrapper />
      </Suspense>
    </div>
  );
}
