import OptionButton from "./OptionButton";
import OptionItem from "./OptionItem";
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
import { generateUUID } from "@/lib/GenerateUUID";
import { useTranslations } from "next-intl";
import OptionText from "./OptionText";
import { useInfoTrackContext } from "@/Context/ContextInfoTrack";

function PlayNextQueue() {
  const b = useTranslations("block");
  const { song } = useInfoTrackContext();
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
        <OptionText>{b("addToPlayNext")}</OptionText>
      </OptionButton>
    </OptionItem>
  );
}

export default PlayNextQueue;
