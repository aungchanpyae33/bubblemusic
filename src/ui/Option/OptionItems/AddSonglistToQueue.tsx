import {
  currentAddToQueueAction,
  SongDetail,
  SongState,
  useRepeatAndCurrentPlayList,
  useSong,
} from "@/lib/zustand";
import { getSongListClient } from "@/database/client-data";
import { useTranslations } from "next-intl";
import {
  SongListPageValue,
  SongListValue,
  useSongListContext,
} from "@/Context/ContextSongListContainer";
import OptionItem from "../OptionUI/OptionItem";
import OptionButton from "../OptionUI/OptionButton";
import OptionIconEl from "../OptionUI/OptionIconEl";
import IconWrapper from "@/ui/general/IconWrapper";
import { ListEnd } from "lucide-react";
import OptionText from "../OptionUI/OptionText";
function AddSonglistToQueue() {
  const b = useTranslations("block");
  const list = useSongListContext();
  const { inPage } = list;

  const currentAddToQueue = useRepeatAndCurrentPlayList(
    (state: currentAddToQueueAction) => state.currentAddToQueue,
  );

  const { id: songId } = useSong(
    (state: SongState) => state.songCu,
  ) as SongDetail;
  if (!songId) return null;
  async function addSongListToQueue() {
    if (inPage) {
      const { songs } = list as SongListPageValue;
      if (!songs || songs.idArray.length === 0) return;
      currentAddToQueue(songs, songs.idArray);
    } else {
      const { id, type } = list as SongListValue;
      const { data, error } = await getSongListClient(id, type);
      if (data && !error) {
        const { songs } = data;
        if (!songs || songs.idArray.length === 0) return;
        currentAddToQueue(songs, songs.idArray);
      }
    }
  }
  return (
    <OptionItem>
      <OptionButton action={addSongListToQueue}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={ListEnd} />
        </OptionIconEl>
        <OptionText>{b("addToQueue")}</OptionText>
      </OptionButton>
    </OptionItem>
  );
}

export default AddSonglistToQueue;
