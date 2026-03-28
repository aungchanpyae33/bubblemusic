import { getUserFullPlaylist } from "@/database/data";
import ListSongsUpFaceContent from "@/ui/LibraryPage/LibPagesUI/ListSongsUpFaceContent";
import { getTranslations } from "next-intl/server";

async function page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const [l, fullPlaylistData] = await Promise.all([
    getTranslations("ListTitle"),
    getUserFullPlaylist(params.slug),
  ]);
  const { data, error } = fullPlaylistData;
  if (!data || error) return null;
  const { result } = data;
  if (!result) return null;
  return <ListSongsUpFaceContent result={result} l={l} route="playlist" />;
}

export default page;
