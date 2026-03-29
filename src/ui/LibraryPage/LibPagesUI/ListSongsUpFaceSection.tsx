import { getLibSectionList } from "@/database/data";
import { LibSonglistRoute } from "@/app/(root)/library/[params]/page";
import { getTranslations } from "next-intl/server";
import ListSongsUpFaceContent from "./ListSongsUpFaceContent";
import EmptyGeneral from "@/ui/general/NoExist/EmptyGeneral";

async function ListSongsUpFaceSection({ route }: { route: LibSonglistRoute }) {
  const [l, libData] = await Promise.all([
    getTranslations("ListTitle"),
    getLibSectionList(route),
  ]);
  const { data, error } = libData;
  if (!data || error) throw new Error("page-load-error");
  const { result } = data;
  if (!result || result.idArray.length === 0) return <EmptyGeneral />;
  return <ListSongsUpFaceContent result={result} l={l} route={route} />;
}

export default ListSongsUpFaceSection;
