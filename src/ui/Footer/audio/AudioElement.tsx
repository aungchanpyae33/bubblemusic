import { ReactNode } from "react";
import AudioSeekBar from "./SliderUi/AudioSeekBar";
// import AudioSeekBarWrapper from "./AudioSeekBarWrapper";
import TimeIndicatorCur from "./Time/TimeIndicatorCur";
import { useDataContext } from "@/lib/MediaSource/ContextMedia";
export interface PropTime {
  cur: number;
  durationTime: number | undefined;
}
function AudioElement({
  children,
  url,
  isFull,
}: {
  children: ReactNode;
  url: string;
  isFull: boolean;
}) {
  const { duration } = useDataContext();

  return (
    <div className=" w-full flex items-center ">
      <AudioSeekBar
        url={url}
        isFull={isFull}
        hideSliderInSmScreen={true}
        childrenFn={(value) => (
          <TimeIndicatorCur
            value={value}
            duration={duration}
            className="text-sm  w-[5rem] text-center hidden sm:inline"
          />
        )}
        duration={duration}
        key={url}
        className="w-full h-[3px] sm:hidden bg-surface-1 relative"
      />
      {children}
    </div>
  );
}

export default AudioElement;
