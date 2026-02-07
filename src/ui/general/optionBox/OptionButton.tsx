import { DeviceContext } from "@/lib/DeviceContext/ContextDeviceCheck";
import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import { useContext } from "react";
import { twMerge } from "tailwind-merge";

interface OptionButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  isSub?: boolean;
  action?: () => void | Promise<void>;
}
const baseStyle = "flex w-full h-full items-center";
function OptionButton({
  className,
  children,
  action,
  isSub,
  ...props
}: OptionButtonProps) {
  const { setShow } = useContext(ContextMoreOption);
  const { device } = useContext(DeviceContext);
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
