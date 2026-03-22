import { ComponentProps } from "react";

type ErrorTextProps = ComponentProps<"div">;
function ErrorText({ children }: ErrorTextProps) {
  return <div className="text-sm mt-2 text-error">{children}</div>;
}

export default ErrorText;
