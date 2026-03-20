import { ListStart } from "lucide-react";
import OptionItem from "./OptionItem";
import OptionIconEl from "./OptionIconEl";
import OptionButton from "./OptionButton";
import IconWrapper from "../IconWrapper";
import {
  currentAddToNextAction,
  SongDetail,
  SongState,
  useRepeatAndCurrentPlayList,
  useSong,
} from "@/lib/zustand";
import { getSongListClient } from "@/database/client-data";
import { useTranslations } from "next-intl";
import OptionText from "./OptionText";
import { useSongListContext } from "@/Context/ContextSongListContainer";

function PlayNextQueueSongList() {
  const b = useTranslations("block");
  const { id, type } = useSongListContext();
  const currentAddToNext = useRepeatAndCurrentPlayList(
    (state: currentAddToNextAction) => state.currentAddToNext,
  );
  const { id: id_scoope } = useSong(
    (state: SongState) => state.songCu,
  ) as SongDetail;
  if (!id_scoope) return null;
  async function addToNextSonglist() {
    const { data, error } = await getSongListClient(id, type);
    if (!data || error) return;
    const { songs } = data;
    if (!songs || songs.idArray.length < 1) return;
    currentAddToNext(songs, songs.idArray, id_scoope);
  }
  return (
    <OptionItem>
      <OptionButton action={addToNextSonglist}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={ListStart} />
        </OptionIconEl>
        <OptionText>{b("addToPlayNext")}</OptionText>
      </OptionButton>
    </OptionItem>
  );
}

export default PlayNextQueueSongList;
