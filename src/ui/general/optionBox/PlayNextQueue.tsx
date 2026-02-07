import OptionButton from "./OptionButton";
import OptionItem from "./OptionItem";
import { useContext } from "react";
import { ListStart } from "lucide-react";
import IconWrapper from "../IconWrapper";
import OptionIconEl from "./OptionIconEl";
import {
  currentAddToNextAction,
  SongDetail,
  SongState,
  useRepeatAndCurrentPlayList,
  useSong,
} from "@/lib/zustand";
import { InfoTrackContext } from "@/ui/trackComponent/ContextInfoTrack";
import { generateUUID } from "@/lib/GenerateUUID";

function PlayNextQueue() {
  const { song } = useContext(InfoTrackContext);
  const currentAddToNext = useRepeatAndCurrentPlayList(
    (state: currentAddToNextAction) => state.currentAddToNext,
  );
  const { id } = useSong((state: SongState) => state.songCu) as SongDetail;

  if (!song || !id) return null;
  const uuid = generateUUID();
  const addUniIdSong = {
    byId: {
      [uuid]: { ...song, id: uuid },
    },
    idArray: [uuid],
  };
  const queueSong = addUniIdSong && addUniIdSong;
  function addToNext() {
    currentAddToNext(queueSong, [uuid], id);
  }
  return (
    <OptionItem>
      <OptionButton action={addToNext}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={ListStart} />
        </OptionIconEl>
        <span>Add to play next </span>
      </OptionButton>
    </OptionItem>
  );
}

export default PlayNextQueue;
