import { useToggleContext } from "@/Context/ContextToggle";
import { focusStateAction, useNotInputFocus } from "@/lib/zustand";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
interface InputComponentProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
function InputComponent({ inputRef, setValue }: InputComponentProps) {
  const b = useTranslations("block");
  const { setOpen } = useToggleContext();
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get("query") || "";
  const setIsInputFocus = useNotInputFocus(
    (state: focusStateAction) => state.setIsInputFocus,
  );
  return (
    <>
      <label htmlFor="search">
        <span className="sr-only">Search</span>
      </label>
      <input
        className="placeholder:text-ink-400 block bg-surface-1 w-full h-[40px]  pl-4 shadow-sm focus:outline-none text-base"
        placeholder={b("searchInputPlaceholder")}
        type="search"
        id="search"
        name="query"
        required
        autoComplete="off"
        spellCheck="false"
        defaultValue={defaultValue}
        ref={inputRef}
        onBlur={() => {
          setOpen(false);
          // setShow(false);
          setIsInputFocus(false);
        }}
        onFocus={() => {
          setOpen(true);
          setValue((pre) => {
            if (!inputRef.current) return pre;
            if (pre !== inputRef.current.value) {
              return inputRef.current.value;
            }
            return pre;
          });
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
