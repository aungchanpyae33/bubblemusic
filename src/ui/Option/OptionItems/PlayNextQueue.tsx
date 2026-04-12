import {
  currentAddToNextAction,
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
import { ListStart } from "lucide-react";
import OptionText from "../OptionUI/OptionText";
import { toast } from "sonner";

function PlayNextQueue() {
  const b = useTranslations("block");
  const toa = useTranslations("Toast");
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
    toast.success(toa("addToPlayNextAction"));
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
