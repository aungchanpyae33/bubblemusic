"use client";

import { GlobalError } from "@/ui/CustomIcon/Icon";
import ErrorWrapper from "@/ui/Error/CustomErrorPage/ErrorWrapper";

export default function ErrorPage({
  unstable_retry,
}: {
  unstable_retry: () => void;
}) {
  return (
    <div className=" flex gap-3 flex-col justify-center  min-h-screen max-h-screen items-center">
      <GlobalError className=" text-ink-400" />

      <ErrorWrapper unstable_retry={unstable_retry} />
    </div>
  );
}
