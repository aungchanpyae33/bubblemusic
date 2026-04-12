import type { LibrarySongListSectionPage } from "@/database/data-types-return";
import ListGeneralHeader from "@/ui/general/ListInfoGeneral/ListGeneralHeader";
import ListUpFaceContainerItem from "@/ui/ListUpFaceContainer/ListUpFaceContainerItem";
import type { _Translator } from "next-intl";
interface ListSongsUpFaceContentProps {
  route: string;
  result: LibrarySongListSectionPage["result"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  l: _Translator<Record<string, any>, "ListTitle">;
}
function ListSongsUpFaceContent({
  result,
  route,
  l,
}: ListSongsUpFaceContentProps) {
  if (!result) return null;
  return (
    <div className=" my-3">
      <ListGeneralHeader>{l(route)}</ListGeneralHeader>
      <div className="xl:grid-cols-6 2xl:grid-cols-[repeat(auto-fit,min(180px))] lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2  grid justify-center gap-4">
        {result.idArray.map((item) => {
          const list = result.byId[item];
          return (
            <div
              className="max-w-[250px] p-2 hover:bg-surface-2 rounded-lg"
              key={list.id}
            >
              <ListUpFaceContainerItem list={list} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListSongsUpFaceContent;
