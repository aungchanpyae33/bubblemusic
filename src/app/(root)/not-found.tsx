import { GlobalNotFoundIcon } from "@/ui/CustomIcon/Icon";
import NotFoundTextLoading from "@/ui/loading/NotFoundTextLoading";
import NotFoundWrapper from "@/ui/NotFoundPage/NotFoundWrapper";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-3 justify-center items-center min-h-96 p-14">
      <GlobalNotFoundIcon className=" text-ink-400" />

      <Suspense fallback={<NotFoundTextLoading />}>
        <NotFoundWrapper />
      </Suspense>
    </div>
  );
}
