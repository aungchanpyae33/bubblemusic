import OptionButton from "./OptionButton";
import OptionItem from "./OptionItem";
import { ListEnd } from "lucide-react";
import IconWrapper from "../IconWrapper";
import OptionIconEl from "./OptionIconEl";

import {
  currentAddToQueueAction,
  SongDetail,
  SongState,
  useRepeatAndCurrentPlayList,
  useSong,
} from "@/lib/zustand";
import { generateUUID } from "@/lib/GenerateUUID";
import { useTranslations } from "next-intl";
import OptionText from "./OptionText";
import { useInfoTrackContext } from "@/Context/ContextInfoTrack";

function AddToQueue() {
  const b = useTranslations("block");
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
