import { focusStateAction, useNotInputFocus } from "@/lib/zustand";
import { useTranslations } from "next-intl";
import { get, useFormContext, useFormState, useWatch } from "react-hook-form";
import ErrorText from "../Error/ErrorInputText";
import { cn } from "@/lib/utils";

const maxLength = 50;
function TitleInput({ name }: { name: string }) {
  const b = useTranslations("block");
  const e = useTranslations("ErrorMsg");
  const { register, control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });

  const { errors } = useFormState({
    control,
    name,
  });

  const {
    onChange,
    onBlur,
    name: refName,
    ref,
  } = register(name, {
    required: e("required", { label: b("playlistForm.title") }),
    maxLength: {
      value: maxLength,
      message: e("maxLength", { max: maxLength }),
    },
  });
  const fieldError = get(errors, name);
  const setIsInputFocus = useNotInputFocus(
    (state: focusStateAction) => state.setIsInputFocus,
  );
  return (
    <div className=" w-full space-y-3">
      <div className=" flex w-full justify-between">
        <label htmlFor="name">{b("playlistForm.title")}</label>
        <span className="text-ink-400">
          {`${inputValue.length}/${maxLength}`}
        </span>
      </div>

      <div className=" w-full relative">
        <input
          type="text"
          name={refName}
          id="name"
          autoComplete="off"
          spellCheck="false"
          ref={ref}
          value={inputValue}
          onChange={onChange}
          onFocus={() => setIsInputFocus(true)}
          onBlur={(e) => {
            onBlur(e); // RHF onBlur
            setIsInputFocus(false); // your custom logic
          }}
          className={cn(
            "h-10 w-full p-2 text-base rounded border appearance-none bg-transparent outline-none border-seperate-soft ",
            fieldError && "ring-2 ring-error ring-offset-0",
            !fieldError &&
              "focus:ring-2 focus:ring-blue-800 focus:ring-offset-0",
          )}
        />
      </div>

      {fieldError && <ErrorText>{fieldError.message}</ErrorText>}
    </div>
  );
}

export default TitleInput;
