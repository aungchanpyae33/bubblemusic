interface ButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode | string;
}
import { twMerge } from "tailwind-merge";
export const baseButtonStyles =
  "p-2 bg-surface-1 rounded-md hover:bg-surface-2 font-medium  focus:ring-2 focus:-ring-offset-0 focus:ring-blue-800 ";
function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button className={twMerge(baseButtonStyles, className)} {...props}>
      {children}
    </button>
  );
}

export default Button;
