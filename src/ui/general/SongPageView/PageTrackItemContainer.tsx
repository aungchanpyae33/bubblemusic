import type { ListSongPage } from "@/database/data-types-return";
import { getTranslations } from "next-intl/server";
import ContextTableHeadBgChange from "@/Context/ContextTableHeadBgChange";
import TableHead from "@/ui/TableHeadGrid/TableHead";
import TableHeadItems from "@/ui/TableHeadGrid/TableHeadItems";
import Track from "@/ui/Track/Track";
import ListItemNotExist from "../NoExist/ListItemNotExist";
import ListGeneralHeader from "../ListInfoGeneral/ListGeneralHeader";
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
  return songs && songs.idArray.length > 0 ? (
    <div className=" w-full  ">
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
  ) : (
    <ListItemNotExist b={b} />
  );
}

export default PageTrackItemContainer;
