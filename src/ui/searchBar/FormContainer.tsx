import { useEffect, useState } from "react";
import SearchToggleButton from "./SearchToggleButton";
import FormWrapper from "./FormWrapper";
import InputComponent from "./InputComponent";
import { X } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
function FormContainer({
  children,
  inputRef,
  setValue,
}: {
  children: React.ReactNode;
  inputRef: React.RefObject<HTMLInputElement | null>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [show, setShow] = useState(false);
  //auto focus the input
  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show, inputRef]);
  return (
    <div className="w-[80%] h-full  sm:max-w-[500px] lg:max-w-[600px] mx-auto">
      <SearchToggleButton
        show={show}
        className="sm:hidden h-full  ml-auto flex items-center p-1 rounded-full"
        onClick={() => {
          setShow(true);
        }}
      />
      <FormWrapper show={show} inputRef={inputRef}>
        <div className=" relative  w-full  ">
          <div className="flex items-stretch rounded-lg focus-within:ring-2 focus-within:ring-blue-800   overflow-hidden">
            <SearchToggleButton
              show={show}
              className="sm:hidden  flex justify-center items-center bg-surface-1 border-r border-seperate-hard border-opacity-15  text-ink-400 rounded-none hover:text-foreground w-[50px] "
              onClick={() => {
                setShow(false);
              }}
            />
            <InputComponent inputRef={inputRef} setValue={setValue} />
            <button
              className="bg-surface-1 px-2 border-l border-seperate-hard flex items-center justify-center border-opacity-15  text-ink-400 rounded-none hover:text-foreground"
              type="button"
              onPointerDown={(e) => {
                e.preventDefault(); // Prevent focus loss
              }}
              onClick={() => {
                if (!inputRef.current) return;
                inputRef.current.value = "";
                setValue("");
              }}
            >
              <IconWrapper size="large" Icon={X} className="rounded-full" />
            </button>
          </div>
          {children}
        </div>
      </FormWrapper>
    </div>
  );
}

export default FormContainer;
