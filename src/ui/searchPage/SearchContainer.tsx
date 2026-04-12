import { twMerge } from "tailwind-merge";

const baseStyle = "bg-section rounded-lg p-5 md:px-6 sm:px-3 px-0";
type SearchContainerProps = React.ComponentProps<"div">;
function SearchContainer({ className, children }: SearchContainerProps) {
  return <div className={twMerge(baseStyle, className)}>{children}</div>;
}

export default SearchContainer;
