import { checkExist, getUserFullPlaylist } from "@/database/data";
import ListSongsUpFaceContent from "@/ui/LibraryPage/LibPagesUI/ListSongsUpFaceContent";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

async function page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  const { exists } = await checkExist("profile", params.slug);
  if (!exists) notFound();

  const [l, fullPlaylistData] = await Promise.all([
    getTranslations("ListTitle"),
    getUserFullPlaylist(params.slug),
  ]);
  const { data, error } = fullPlaylistData;
  if (!data || error) notFound();
  const { result } = data;
  if (!result || result.idArray.length === 0) notFound();

  return <ListSongsUpFaceContent result={result} l={l} route="playlist" />;
}

export default page;
