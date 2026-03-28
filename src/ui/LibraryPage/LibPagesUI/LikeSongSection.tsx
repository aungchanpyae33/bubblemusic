import { getLikeSongs } from "@/database/data";
import ListPageView from "@/ui/general/SongPageView/ListPageView";
import PageTrackItemContainer from "@/ui/general/SongPageView/PageTrackItemContainer";
import { getTranslations } from "next-intl/server";

async function LikeSongSection() {
  const l = await getTranslations("ListTitle");
  const like_title = l("liked-songs");
  const { data, error } = await getLikeSongs(like_title);
  if (!data || error) return null;
  const { songs } = data;
  return (
    <ListPageView songs={songs}>
      <PageTrackItemContainer description={"playlist"} listSong={songs} />
    </ListPageView>
  );
}

export default LikeSongSection;
