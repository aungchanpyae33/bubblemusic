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
import { useSongListContext } from "@/ui/playlist/playlistOption/ContextSongListContainer";
import { getSongListClient } from "@/database/client-data";
import { useTranslations } from "next-intl";
import OptionText from "./OptionText";

function AddSonglistToQueue() {
  const b = useTranslations("block");
  const { id, type } = useSongListContext();
  const currentAddToQueue = useRepeatAndCurrentPlayList(
    (state: currentAddToQueueAction) => state.currentAddToQueue,
  );
  const { id: songId } = useSong(
    (state: SongState) => state.songCu,
  ) as SongDetail;
  if (!songId) return null;
  async function addSongListToQueue() {
    const { data, error } = await getSongListClient(id, type);
    if (data && !error) {
      const { songs } = data;
      if (songs && songs.idArray.length > 0) {
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
