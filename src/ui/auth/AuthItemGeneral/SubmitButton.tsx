import Button from "@/components/button/Button";
import { SpinnerIcon } from "@/ui/CustomIcon/Icon";
import { useTranslations } from "next-intl";

function SubmitButton({
  isPending,
  actionText,
}: {
  isPending: boolean;
  actionText: "login" | "signup";
}) {
  const au = useTranslations("Auth");
  return (
    <Button
      disabled={isPending}
      type="submit"
      className="flex w-2/3 mx-auto h-10 items-center justify-center rounded-md border text-inherit border-gray-200 bg-section px-3.5 text-base font-medium disabled:cursor-not-allowed  shadow-[_2px_2px_var(--foreground)] transition-all duration-150 active:shadow-[_1px_1px_var(--semicontainer)]  active:translate-y-[1px] active:translate-x-[1px] disabled:opacity-65"
    >
      {isPending ? (
        <span className=" flex items-center gap-2">
          <SpinnerIcon className=" animate-spin size-6" />
        </span>
      ) : (
        <span>{actionText === "login" ? au("login") : au("signUp")}</span>
      )}
    </Button>
  );
}

export default SubmitButton;
