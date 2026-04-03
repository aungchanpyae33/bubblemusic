import ErrorText from "@/ui/Error/ErrorInputText";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { get, useFormContext } from "react-hook-form";
const maxLength = 20;
const name = "display_name";
function NameInput() {
  const au = useTranslations("Auth");
  const e = useTranslations("ErrorMsg");
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const fieldError = get(errors, name);
  return (
    <div className=" felx-1 w-full space-y-2">
      <h4>{au(name)}</h4>
      <div
        className={clsx(
          "flex min-h-12 gap-5 w-full max-w-full overflow-hidden border border-seperate-soft rounded-md relative",
          {
            "ring-2 ring-error ring-offset-0 ": fieldError,
            "focus:ring-2 focus:ring-blue-800 focus:ring-offset-0": !fieldError,
          },
        )}
      >
        <input
          autoComplete="off"
          spellCheck="false"
          type="text"
          className=" flex-1 w-full pl-2  block  text-base appearance-none  outline-none bg-transparent"
          placeholder={au(name)}
          {...register(name, {
            required: e("required", { label: au(name) }),
            maxLength: {
              value: maxLength,
              message: e("maxLength", { max: maxLength }),
            },
          })}
        />
      </div>
      {fieldError && <ErrorText>{fieldError.message}</ErrorText>}
    </div>
  );
}

export default NameInput;
