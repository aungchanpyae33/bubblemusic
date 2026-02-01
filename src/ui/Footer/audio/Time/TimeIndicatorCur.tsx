import type { valueProps } from "@/lib/CustomHooks/useAudioSeek";
import { TimeFormat } from "@/lib/TimeFormat";
interface Props extends React.ComponentProps<"span"> {
  value: valueProps["value"];
  duration: number;
}
//to handle second shift when audiofull is open , value will be undefined
let preData = 0;
function TimeIndicatorCur({ value, className, duration }: Props) {
  const secReturn = value ? value : preData;
  const data = 100 - secReturn;

  const currentTime = (data / 100) * duration;
  preData = secReturn;
  return <span className={className}>{TimeFormat(currentTime)}</span>;
}

export default TimeIndicatorCur;
