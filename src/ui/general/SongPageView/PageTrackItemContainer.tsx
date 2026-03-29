import type { ListSongPage } from "@/database/data-types-return";
import { getTranslations } from "next-intl/server";
import ContextTableHeadBgChange from "@/Context/ContextTableHeadBgChange";
import TableHead from "@/ui/TableHeadGrid/TableHead";
import TableHeadItems from "@/ui/TableHeadGrid/TableHeadItems";
import Track from "@/ui/Track/Track";
import ListGeneralHeader from "../ListInfoGeneral/ListGeneralHeader";
import EmptyGeneral from "../NoExist/EmptyGeneral";
async function PageTrackItemContainer({
  description,
  listSong,
}: {
  description: string;
  listSong: ListSongPage;
}) {
  const [b, l] = await Promise.all([
    getTranslations("block"),
    getTranslations("ListTitle"),
  ]);
  const songs = listSong.songs;
  if (!songs || songs.idArray.length === 0) return <EmptyGeneral />;
  return (
    <div className=" w-full my-4">
      <ListGeneralHeader>{l(description)}</ListGeneralHeader>
      <ContextTableHeadBgChange>
        <TableHead>
          <TableHeadItems b={b} />
        </TableHead>
        {songs.idArray.map((id) => {
          const item = songs.byId[id];
          return <Track key={item.id} listSong={listSong} song={item} />;
        })}
      </ContextTableHeadBgChange>
    </div>
  );
}

export default PageTrackItemContainer;
