import { useMemo, useRef } from "react";
import AudioThumbSlider from "../audio/SliderUi/AudioThumbSlider";
import AudioProgressbar from "../audio/SliderUi/AudioProgressbar";
import VolumeSlider from "./VolumeSlider";
import VolumeSliderActionWrapper from "./VolumeSliderActionWrapper";
import clsx from "clsx";
import VolumeMuteButton from "./VolumeMuteButton";
import ContextVolume from "./ContextVolume";
import VolumeContainer from "./VolumeContainer";
import VolumeToggleButton from "./VolumeToggleButton";
import { useMediaAudioFullContext } from "@/lib/MediaSource/ContextMediaAudioFull";
import useVolumeSeek from "@/lib/CustomHooks/useVolumeSeek";

function Volume({ isFull }: { isFull: boolean }) {
  const { open } = useMediaAudioFullContext();
  const shouldRun = useMemo(() => (isFull ? open : !open), [isFull, open]);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const { value, setValue, isDragging, setIsDragging } = useVolumeSeek({
    sliderRef,
    shouldRun,
  });

  return (
    <ContextVolume>
      <VolumeContainer isDragging={isDragging}>
        <div className="flex  w-fit gap-1  flex-1">
          <VolumeMuteButton value={value} setValue={setValue} />

          <VolumeSlider
            className="flex  h-full   w-full px-[7px]  md:flex items-center select-none touch-none no-select"
            setIsDragging={setIsDragging}
            sliderRef={sliderRef}
            setValue={setValue}
            value={value}
          >
            <VolumeSliderActionWrapper
              sliderRef={sliderRef}
              setIsDragging={setIsDragging}
              setValue={setValue}
            >
              <div className=" w-full h-[2px] bg-surface-1 relative">
                <AudioProgressbar value={value} progressRef={progressRef} />

                <AudioThumbSlider
                  value={value}
                  className={clsx(
                    "absolute  w-[14px] rounded-full h-[14px] top-1/2 -translate-y-1/2  -translate-x-[7px] bg-foreground",
                  )}
                />
              </div>
            </VolumeSliderActionWrapper>
          </VolumeSlider>
        </div>
      </VolumeContainer>

      <VolumeToggleButton value={value} />
    </ContextVolume>
  );
}

export default Volume;
