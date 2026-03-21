import { twMerge } from "tailwind-merge";

type LyricPaddingBlockProps = React.ComponentProps<"div">;
function LyricPaddingBlock({ className, children }: LyricPaddingBlockProps) {
  return <div className={twMerge(className)}>{children}</div>;
}

export default LyricPaddingBlock;
