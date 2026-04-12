import { ListStart } from "lucide-react";
import {
  currentAddToNextAction,
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
import OptionText from "../OptionUI/OptionText";
import { toast } from "sonner";

function PlayNextQueueSongList() {
  const b = useTranslations("block");
  const toa = useTranslations("Toast");
  const list = useSongListContext();
  const { inPage } = list;
  const currentAddToNext = useRepeatAndCurrentPlayList(
    (state: currentAddToNextAction) => state.currentAddToNext,
  );
  const { id: id_scoope } = useSong(
    (state: SongState) => state.songCu,
  ) as SongDetail;
  if (!id_scoope) return null;
  async function addToNextSonglist() {
    const toastId = toast.loading(toa("loading"));
    if (inPage) {
      const { songs } = list as SongListPageValue;
      if (!songs || songs.idArray.length === 0) {
        toast.dismiss(toastId);
        return;
      }
      currentAddToNext(songs, songs.idArray, id_scoope);
      toast.success(toa("addToPlayNextAction"), { id: toastId });
    } else {
      const { id, type } = list as SongListValue;
      const { data, error } = await getSongListClient(id, type);

      if (!data || error) {
        toast.error(toa("error"), { id: toastId });
        return;
      }
      const { songs } = data;
      if (!songs || songs.idArray.length === 0) {
        toast.dismiss(toastId);
        return;
      }
      currentAddToNext(songs, songs.idArray, id_scoope);
      toast.success(toa("addToPlayNextAction"), { id: toastId });
    }
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
