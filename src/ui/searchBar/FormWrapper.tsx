import Form from "next/form";
import { ReactNode } from "react";
import clsx from "clsx";
interface FormWrapperProps {
  children: ReactNode;
  inputRef: React.RefObject<HTMLInputElement | null>;
  show: boolean;
}
import { useRouter } from "nextjs-toploader/app";
import { useToggleContext } from "@/Context/ContextToggle";
import { searchGuard } from "@/lib/searchGuard";
function FormWrapper({ children, inputRef, show }: FormWrapperProps) {
  const { setOpen } = useToggleContext();
  const router = useRouter();
  function goSearch(FormData: FormData) {
    setOpen(false);
    inputRef.current?.blur();
    const query = FormData.get("query") as string;

    if (searchGuard(query)) return;
    router.push(`/search?query=${encodeURIComponent(query)}`);
  }
  return (
    <Form
      action={goSearch}
      className={clsx(
        "w-full px-2 hidden sm:flex h-[70px] bg-inherit  top-0 left-0  absolute items-center  sm:w-auto md:bg-transparent sm:h-auto  sm:static  sm:flex-none sm:items-start",
        {
          unhide: show,
        },
      )}
    >
      {children}
    </Form>
  );
}

export default FormWrapper;
