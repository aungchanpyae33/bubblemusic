"use client";

import { GlobalError } from "@/ui/CustomIcon/Icon";
import ErrorWrapper from "@/ui/Error/CustomErrorPage/ErrorWrapper";

export default function ErrorPage({
  unstable_retry,
}: {
  unstable_retry: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 justify-center items-center h-96 p-14">
      <GlobalError className=" text-ink-400" />

      <ErrorWrapper unstable_retry={unstable_retry} />
    </div>
  );
}
