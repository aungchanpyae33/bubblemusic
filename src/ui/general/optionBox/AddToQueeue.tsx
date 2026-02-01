import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import OptionButton from "./OptionButton";
import OptionItem from "./OptionItem";
import { useContext } from "react";
import { ListEnd } from "lucide-react";
import IconWrapper from "../IconWrapper";
import OptionIconEl from "./OptionIconEl";
import { InfoTrackContext } from "@/ui/trackComponent/ContextInfoTrack";
import {
  currentAddToQueueAction,
  SongDetail,
  SongState,
  useRepeatAndCurrentPlayList,
  useSong,
} from "@/lib/zustand";
import { generateUUID } from "@/lib/GenerateUUID";

function AddToQueue() {
  const { setShow } = useContext(ContextMoreOption);
  const { song } = useContext(InfoTrackContext);
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
    setShow(false);
  }
  return (
    <OptionItem>
      <OptionButton onClick={addToQueue}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={ListEnd} />
        </OptionIconEl>

        <span>add to the queeue </span>
      </OptionButton>
    </OptionItem>
  );
}

export default AddToQueue;
