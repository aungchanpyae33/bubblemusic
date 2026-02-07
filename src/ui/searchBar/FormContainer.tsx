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
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [show, setShow] = useState(false);
  //auto focus the input
  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show, inputRef]);
  return (
    <div className="w-[80%]  sm:max-w-[500px] lg:max-w-[600px] mx-auto">
      <SearchToggleButton
        show={show}
        setShow={setShow}
        className="sm:hidden bg-surface-1    p-2 rounded-full"
        onClick={() => {
          setShow(true);
        }}
      />
      <FormWrapper show={show} inputRef={inputRef}>
        <div className=" relative  w-full  ">
          <div
            className="flex items-stretch border border-borderFull border-opacity-25 focus-within:outline
            focus-within:outline-2 focus-within:outline-borderFull rounded-md overflow-hidden"
          >
            <SearchToggleButton
              show={show}
              setShow={setShow}
              className="sm:hidden flex justify-center items-center bg-surface-1 border-r border-seperate-hard border-opacity-15  text-ink-400 hover:text-foreground w-[70px] "
              onClick={() => {
                setShow(false);
              }}
            />
            <InputComponent
              inputRef={inputRef}
              setValue={setValue}
              setShow={setShow}
            />
            <button
              className="bg-surface-1   px-2"
              type="reset"
              onPointerDown={(e) => {
                e.preventDefault(); // Prevent focus loss
              }}
              onClick={() => {
                setValue("");
              }}
            >
              <IconWrapper
                size="large"
                Icon={X}
                className="rounded-full scale-100 text-ink-400 hover:text-foreground hover:scale-105 transition-[scale] duration-200  "
              />
            </button>
          </div>
          {children}
        </div>
      </FormWrapper>
    </div>
  );
}

export default FormContainer;
