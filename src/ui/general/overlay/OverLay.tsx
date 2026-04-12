import { twMerge } from "tailwind-merge";

interface OverLayProp extends React.ComponentProps<"div"> {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const baseStyle = "z-30 fixed top-0 left-0 bottom-0 right-0";
function OverLay({ setOpen, className, ...props }: OverLayProp) {
  return (
    <div
      onClick={() => {
        setOpen(false);
      }}
      className={twMerge(baseStyle, className)}
      {...props}
    ></div>
  );
}

export default OverLay;
