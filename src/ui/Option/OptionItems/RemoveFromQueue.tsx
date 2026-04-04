import { ListMinus } from "lucide-react";
import {
  removeFromQueueAction,
  SongDetail,
  SongState,
  useRepeatAndCurrentPlayList,
  useSong,
} from "@/lib/zustand";
import { useTranslations } from "next-intl";
import { useInfoTrackContext } from "@/Context/ContextInfoTrack";
import OptionItem from "../OptionUI/OptionItem";
import OptionButton from "../OptionUI/OptionButton";
import OptionIconEl from "../OptionUI/OptionIconEl";
import IconWrapper from "@/ui/general/IconWrapper";
import OptionText from "../OptionUI/OptionText";
import { toast } from "sonner";

function RemoveFromQueue() {
  const b = useTranslations("block");
  const toa = useTranslations("Toast");
  const { song } = useInfoTrackContext();
  const removeFromQueue = useRepeatAndCurrentPlayList(
    (state: removeFromQueueAction) => state.removeFromQueue,
  );
  const { id: id_scope } = useSong(
    (state: SongState) => state.songCu,
  ) as SongDetail;

  if (!song) return null;
  const { id } = song;
  // Prevent removing the currently playing song from the queue
  if (id === id_scope) return null;

  function removeFromQueueFn() {
    removeFromQueue(id);
    toast.success(toa("removeFromQueueAction"));
  }
  return (
    <OptionItem>
      <OptionButton action={removeFromQueueFn}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={ListMinus} />
        </OptionIconEl>

        <OptionText>{b("removeFromQueue")} </OptionText>
      </OptionButton>
    </OptionItem>
  );
}

export default RemoveFromQueue;
