import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const baseStyle =
  " border my-3 rounded border-borderFull w-fit gap-x-6 p-3 h-[80px] flex items-center";
interface ListContainerProps extends React.ComponentProps<"div"> {
  children: ReactNode;
  className?: string;
}
function ListContainer({ children, className }: ListContainerProps) {
  return <div className={twMerge(baseStyle, className)}>{children}</div>;
}

export default ListContainer;
