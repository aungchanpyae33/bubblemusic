import { VolumeValueActions } from "@/lib/zustand";
import IconWrapper from "@/ui/general/IconWrapper";
import { Volume2, VolumeX } from "lucide-react";
import React, { useState } from "react";
import { useVolumeContext } from "./ContextVolume";
import { useAudioElementContext } from "../audio/AudioWrapper";
interface Props extends React.ComponentProps<"button"> {
  value: number;
  setValue: VolumeValueActions["setValue"];
}
function VolumeMuteButton({ value, setValue }: Props) {
  const [mute, setMute] = useState(100);
  const { setOpen } = useVolumeContext();
  const { audioElRef } = useAudioElementContext();
  return (
    <button
      className="w-[50px]  flex items-center justify-center"
      onClick={() => {
        const audioEl = audioElRef.current;
        if (!audioEl) return;
        if (value < 100) {
          audioEl.volume = 0;
          setValue(100);
          setMute(value);
        } else {
          // to prevetn the value to be 0 in initaal state when mute is not modified
          if (mute === 100) {
            const volValue = 1;
            audioEl.volume = volValue;
            setValue(0);
          } else {
            const volValue = 1 - mute / 100;
            audioEl.volume = volValue;
            setValue(mute);
          }
        }
        setOpen(false);
      }}
    >
      {value === 100 ? (
        <IconWrapper size="small" Icon={VolumeX} />
      ) : (
        <IconWrapper size="small" Icon={Volume2} />
      )}
    </button>
  );
}

export default VolumeMuteButton;
