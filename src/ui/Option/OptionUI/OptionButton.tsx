import { useDeviceContext } from "@/Context/ContextDeviceCheck";
import { useMoreOptionContext } from "@/Context/ContextMoreOption";
import { twMerge } from "tailwind-merge";

interface OptionButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  isSub?: boolean;
  action?: () => void | Promise<void | null> | null;
}
const baseStyle = "flex w-full h-full items-center";
function OptionButton({
  className,
  children,
  action,
  isSub,
  ...props
}: OptionButtonProps) {
  const { setShow } = useMoreOptionContext();
  const { device } = useDeviceContext();
  function handlClick() {
    if (isSub) return;
    if (device !== "mobile") setShow(false);
    if (action) action();
  }
  return (
    <button
      onClick={handlClick}
      className={twMerge(baseStyle, className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default OptionButton;
