import { checkExist, getUserFullPlaylist } from "@/database/data";
import EmptyGeneral from "@/ui/general/NoExist/EmptyGeneral";
import ListSongsUpFaceContent from "@/ui/LibraryPage/LibPagesUI/ListSongsUpFaceContent";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

async function page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  const { exists, error: checkExistError } = await checkExist(
    "profile",
    params.slug,
  );
  if (checkExistError) throw new Error("page-load-error");
  if (!exists) notFound();

  const [l, fullPlaylistData] = await Promise.all([
    getTranslations("ListTitle"),
    getUserFullPlaylist(params.slug),
  ]);
  const { data, error } = fullPlaylistData;
  if (!data || error) notFound();
  const { result } = data;
  if (!result || result.idArray.length === 0) return <EmptyGeneral />;

  return <ListSongsUpFaceContent result={result} l={l} route="playlist" />;
}

export default page;
