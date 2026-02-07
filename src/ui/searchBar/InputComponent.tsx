import { useContext } from "react";
import { ContextToggle } from "./ToggleContext";
import { focusStateAction, useNotInputFocus } from "@/lib/zustand";
import { useSearchParams } from "next/navigation";
interface InputComponentProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
function InputComponent({ inputRef, setShow, setValue }: InputComponentProps) {
  const { setOpen } = useContext(ContextToggle);
  const setIsInputFocus = useNotInputFocus(
    (state: focusStateAction) => state.setIsInputFocus,
  );
  const searchParams = useSearchParams();
  const defaultValueRef = searchParams.get("query") || "";
  return (
    <>
      <label htmlFor="search">
        <span className="sr-only">Search</span>
      </label>
      <input
        className="placeholder:text-ink-400 placeholder:leading-relaxed block bg-surface-1 w-full h-[40px]  pl-4 shadow-sm focus:outline-none text-base"
        placeholder="ရှာဖွေမည်"
        type="search"
        id="search"
        name="query"
        required
        autoComplete="off"
        spellCheck="false"
        defaultValue={defaultValueRef}
        ref={inputRef}
        onBlur={() => {
          setOpen(false);
          // setShow(false);
          setIsInputFocus(false);
        }}
        onFocus={() => {
          setOpen(true);
          // setShow(true);
          setIsInputFocus(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            const inputElement = e.currentTarget;
            e.preventDefault();
            if (inputElement.selectionStart !== inputElement.value.length) {
              const goToEndValue = inputElement.value.length;
              inputElement.setSelectionRange(goToEndValue, goToEndValue);
              return;
            }
            e.currentTarget.blur();
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
          }
        }}
        onChange={(e) => {
          setOpen(true);
          setValue(e.currentTarget.value);
        }}
      />
    </>
  );
}

export default InputComponent;
