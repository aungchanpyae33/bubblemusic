import {
  currentAddToQueueAction,
  SongDetail,
  SongState,
  useRepeatAndCurrentPlayList,
  useSong,
} from "@/lib/zustand";
import { generateUUID } from "@/lib/GenerateUUID";
import { useTranslations } from "next-intl";
import { useInfoTrackContext } from "@/Context/ContextInfoTrack";
import OptionItem from "../OptionUI/OptionItem";
import OptionButton from "../OptionUI/OptionButton";
import OptionIconEl from "../OptionUI/OptionIconEl";
import IconWrapper from "@/ui/general/IconWrapper";
import { ListEnd } from "lucide-react";
import OptionText from "../OptionUI/OptionText";
import { toast } from "sonner";

function AddToQueue() {
  const b = useTranslations("block");
  const toa = useTranslations("Toast");
  const { song } = useInfoTrackContext();
  const currentAddToQueue = useRepeatAndCurrentPlayList(
    (state: currentAddToQueueAction) => state.currentAddToQueue,
  );

  const { id } = useSong((state: SongState) => state.songCu) as SongDetail;
  if (!song || !id) return null;
  const uuid = generateUUID();
  const addUniIdSong = {
    byId: {
      [uuid]: {
        ...song,
        id: uuid,
      },
    },
    idArray: [uuid],
  };
  const queueSong = addUniIdSong && addUniIdSong;
  function addToQueue() {
    currentAddToQueue(queueSong, [uuid]);
    toast.success(toa("addToQueueAction"));
  }
  return (
    <OptionItem>
      <OptionButton action={addToQueue}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={ListEnd} />
        </OptionIconEl>

        <OptionText>{b("addToQueue")}</OptionText>
      </OptionButton>
    </OptionItem>
  );
}

export default AddToQueue;
