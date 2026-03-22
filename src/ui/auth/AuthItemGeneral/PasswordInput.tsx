import ErrorText from "@/ui/Error/ErrorInputText";
import IconWrapper from "@/ui/general/IconWrapper";
import clsx from "clsx";
import { Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { get, useFormContext } from "react-hook-form";
const name = "password";
const minLengthPassword = 6;
function PasswordInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const au = useTranslations("Auth");
  const e = useTranslations("ErrorMsg");
  const fieldError = get(errors, name);
  return (
    <div className=" space-y-2">
      <h4>{au("password")}</h4>
      <div
        className={clsx(
          "flex min-h-12 gap-5 overflow-hidden border border-seperate-soft rounded-md relative",
          {
            "ring-2 ring-error ring-offset-0 ": fieldError,
            "focus:ring-2 focus:ring-blue-800 focus:ring-offset-0": !fieldError,
          },
        )}
      >
        <input
          type="password"
          className="flex-1 block pl-10 placeholder:text-ink-400 text-base appearance-none  outline-none bg-transparent"
          placeholder={au("passwordPlaceholder")}
          {...register(name, {
            required: e("required", { label: au("password") }),
            minLength: {
              value: minLengthPassword,
              message: e("minLengthPassword", { min: minLengthPassword }),
            },
            // Lowercase, uppercase letters, digits and symbols )
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/,
              message: e("passwordComplexity", { min: minLengthPassword }),
            },
          })}
        />
        <span className=" absolute left-2 h-full top-0 flex items-center">
          <IconWrapper Icon={Lock} />
        </span>
      </div>
      {fieldError && <ErrorText>{fieldError.message}</ErrorText>}
    </div>
  );
}

export default PasswordInput;
