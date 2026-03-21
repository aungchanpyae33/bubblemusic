import { ReactNode, useMemo, useRef } from "react";

import AudioThumbSlider from "./AudioThumbSlider";
import AudioProgressbar from "./AudioProgressbar";
import AudioSliderActionWrapper from "./AudioSliderActionWrapper";
import AudioSlider from "./AudioSlider";
import clsx from "clsx";
import type { valueProps } from "@/lib/CustomHooks/useAudioSeek";
import useAudioSeek from "@/lib/CustomHooks/useAudioSeek";
import { useMediaAudioFullContext } from "@/Context/ContextMediaAudioFull";
interface PropAudioSeek extends React.ComponentProps<"div"> {
  duration: number;
  hideSliderInSmScreen: boolean;
  childrenFn: (value: valueProps["value"]) => ReactNode;
  url: string;
  isFull: boolean;
}

function AudioSeekBar({
  duration,
  childrenFn,
  className,
  hideSliderInSmScreen,
  url,
  isFull,
}: PropAudioSeek) {
  const { open } = useMediaAudioFullContext();

  const shouldRun = useMemo(() => (isFull ? open : !open), [isFull, open]);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const { value, setValue, isDragging, setIsDragging } = useAudioSeek({
    sliderRef,
    duration,
    url,
    shouldRun,
  });
  return (
    <>
      {childrenFn(value!)}
      <div className={className}>
        <AudioProgressbar value={value} progressRef={progressRef} />
        <AudioThumbSlider
          className={clsx(
            "absolute group-hover:inline  w-[20px] rounded-full h-[20px] top-1/2 -translate-y-1/2  -translate-x-[10px]",
            {
              hidden: !isDragging,
              inline: isDragging,
            },
          )}
          value={value}
        />
      </div>
      <AudioSlider
        sliderRef={sliderRef}
        setIsDragging={setIsDragging}
        duration={duration}
        value={value}
        setValue={setValue}
        progressRef={progressRef}
        className={clsx(
          "h-[25px] w-full touch-none   items-center px-[7px] select-none no-select",
          {
            "hidden sm:flex": hideSliderInSmScreen,
            flex: !hideSliderInSmScreen,
          },
        )}
      >
        <AudioSliderActionWrapper
          sliderRef={sliderRef}
          setIsDragging={setIsDragging}
          setValue={setValue}
        >
          <div className=" w-full h-[2.5px]    bg-surface-1 relative">
            <AudioProgressbar value={value} progressRef={progressRef} />

            <AudioThumbSlider
              className={clsx(
                "absolute group-hover:inline  w-[14px] rounded-full h-[14px] top-1/2 -translate-y-1/2 -translate-x-[7px] bg-foreground",
                {
                  hidden: !isDragging,
                  inline: isDragging,
                },
              )}
              value={value}
            />
          </div>
        </AudioSliderActionWrapper>
      </AudioSlider>
    </>
  );
}

export default AudioSeekBar;
