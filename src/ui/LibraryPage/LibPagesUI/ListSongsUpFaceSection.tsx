import { getLibSectionList } from "@/database/data";
import { LibSonglistRoute } from "@/app/(root)/library/[params]/page";
import { getTranslations } from "next-intl/server";
import ListSongsUpFaceContent from "./ListSongsUpFaceContent";

async function ListSongsUpFaceSection({ route }: { route: LibSonglistRoute }) {
  const [l, libData] = await Promise.all([
    getTranslations("ListTitle"),
    getLibSectionList(route),
  ]);
  const { data, error } = libData;
  if (!data || error) return null;
  const { result } = data;

  return <ListSongsUpFaceContent result={result} l={l} route={route} />;
}

export default ListSongsUpFaceSection;
