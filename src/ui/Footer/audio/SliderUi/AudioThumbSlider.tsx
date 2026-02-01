import type { valueProps } from "@/lib/CustomHooks/useAudioSeek";

interface Props extends React.ComponentProps<"span"> {
  value: valueProps["value"];
}
function AudioThumbSlider({ value, className }: Props) {
  return (
    <span
      className={className}
      style={{ left: `calc(100% - ${value}%)` }}
    ></span>
  );
}
export default AudioThumbSlider;
