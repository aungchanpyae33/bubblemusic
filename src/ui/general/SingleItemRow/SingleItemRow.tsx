import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";
const baseStyle =
  "grid rounded-md grid-cols-[64px_1fr_40px] h-16 gap-1 transition-colors  duration-150 [&:has(:focus-visible)]:ring-4  hover:bg-surface-2 group";
interface SingleItemRowProps extends ComponentProps<"div"> {
  children: ReactNode;
  className?: string;
}
function SingleItemRow({ children, className, ...props }: SingleItemRowProps) {
  return (
    <div className={cn(baseStyle, className)} {...props}>
      {children}
    </div>
  );
}

export default SingleItemRow;
