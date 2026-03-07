import { ListMinus } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import OptionButton from "../general/optionBox/OptionButton";
import OptionIconEl from "../general/optionBox/OptionIconEl";
import OptionItem from "../general/optionBox/OptionItem";
import { useContext } from "react";
import { InfoTrackContext } from "../trackComponent/ContextInfoTrack";
import {
  removeFromQueueAction,
  SongDetail,
  SongState,
  useRepeatAndCurrentPlayList,
  useSong,
} from "@/lib/zustand";
import { useTranslations } from "next-intl";
import OptionText from "../general/optionBox/OptionText";

function RemoveFromQueue() {
  const b = useTranslations("block");
  const { song } = useContext(InfoTrackContext);
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
