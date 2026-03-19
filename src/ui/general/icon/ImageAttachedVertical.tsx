"use client";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
const baseStyle = "p-1 rounded-full bg-background absolute top-1 right-1";

interface ImageAttachedVerticalProps extends ComponentProps<"div"> {
  className?: string;
}
function ImageAttachedVertical({
  className,
  children,
  ...props
}: ImageAttachedVerticalProps) {
  return (
    <div
      className={twMerge(baseStyle, className)}
      {...props}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {children}
    </div>
  );
}

export default ImageAttachedVertical;
