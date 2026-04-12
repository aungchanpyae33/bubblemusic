import { LinkProps } from "next/link";
import { ReactNode } from "react";
import NoThankYouPreFetchLink from "./NoThankYouPreFetchLink";
import { cn } from "@/lib/utils";
const baseStyle = "block truncate text-start hover:underline";
interface UnderLineLinkHoverProps extends LinkProps {
  children: ReactNode;
  className?: string;
}
function UnderLineLinkHover({
  children,
  className,
  ...props
}: UnderLineLinkHoverProps) {
  return (
    <NoThankYouPreFetchLink className={cn(baseStyle, className)} {...props}>
      {children}
    </NoThankYouPreFetchLink>
  );
}

export default UnderLineLinkHover;
