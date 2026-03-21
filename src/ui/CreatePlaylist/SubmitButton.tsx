import { SpinnerIcon } from "@/ui/CustomIcon/Icon";
import { useTranslations } from "next-intl";
import React from "react";
interface SubmitButton extends React.ComponentProps<"div"> {
  isPending: boolean;
}
function SubmitButton({ isPending }: { isPending: boolean }) {
  const b = useTranslations("block");
  return (
    <button
      className="w-24 bg-surface-1 p-2 flex justify-center items-center rounded-xl"
      type="submit"
      disabled={isPending}
    >
      {isPending ? (
        <SpinnerIcon className=" animate-spin size-6" />
      ) : (
        b("create")
      )}
    </button>
  );
}

export default SubmitButton;
