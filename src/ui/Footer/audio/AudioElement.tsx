import { ReactNode, useContext } from "react";
import AudioSeekBar from "./SliderUi/AudioSeekBar";
// import AudioSeekBarWrapper from "./AudioSeekBarWrapper";
import TimeIndicatorCur from "./Time/TimeIndicatorCur";
import { DataContext } from "@/lib/MediaSource/ContextMedia";
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
  const { duration } = useContext(DataContext);

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
