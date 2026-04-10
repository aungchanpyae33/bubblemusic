import {
  IsRepeatState,
  RepeatAction,
  useRepeatAndCurrentPlayList,
} from "@/lib/zustand";
import IconWrapper from "@/ui/general/IconWrapper";
import clsx from "clsx";
import { Repeat } from "lucide-react";

function AudioFunctionRepeat({ className }: React.ComponentProps<"button">) {
  const isRepeat = useRepeatAndCurrentPlayList(
    (state: IsRepeatState) => state.isRepeat,
  );
  const setRepeat = useRepeatAndCurrentPlayList(
    (state: RepeatAction) => state.setRepeat,
  );
  return (
    <button className={className} onClick={() => setRepeat()}>
      <IconWrapper
        Icon={Repeat}
        size="small"
        className={clsx("", {
          "text-brand": isRepeat,
        })}
      />
    </button>
  );
}

export default AudioFunctionRepeat;
