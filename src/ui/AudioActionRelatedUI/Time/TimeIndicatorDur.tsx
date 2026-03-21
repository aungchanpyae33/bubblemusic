import { TimeFormat } from "@/lib/TimeFormat";
interface Props extends React.ComponentProps<"span"> {
  duration: number | undefined;
}
function TimeIndicatorDur({ className, duration }: Props) {
  return <span className={className}>{TimeFormat(duration)}</span>;
}

export default TimeIndicatorDur;
