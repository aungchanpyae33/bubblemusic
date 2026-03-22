import Button from "@/components/button/Button";
import { SpinnerIcon } from "@/ui/CustomIcon/Icon";
import React from "react";
import { useFormContext, useFormState } from "react-hook-form";
interface SubmitButton extends React.ComponentProps<"div"> {
  isPending: boolean;
}
function SubmitButton({
  isPending,
  text,
}: {
  isPending: boolean;
  text: string;
}) {
  const { control } = useFormContext();

  const { isDirty } = useFormState({
    control,
  });
  const disabled = isPending || !isDirty;
  return (
    <Button
      className="w-24 bg-surface-1 disabled:cursor-not-allowed disabled:opacity-65 p-2 flex justify-center items-center rounded-xl"
      type="submit"
      disabled={disabled}
    >
      {isPending ? <SpinnerIcon className=" animate-spin size-6" /> : text}
    </Button>
  );
}

export default SubmitButton;
