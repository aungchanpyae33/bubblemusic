import Track from "../trackComponent/Track";
import TableHeadBgChange from "./TableHeadBgChange";
import type { ListSongPage } from "@/database/data-types-return";
import { getTranslations } from "next-intl/server";
import ListGeneralHeader from "./ListGeneralHeader";
import TableHead from "../TableGrid/TableHead";
import TableHeadItems from "../TableGrid/TableHeadItems";
import ListItemNotExist from "../general/NoExist/ListItemNotExist";
async function AudiosContainer({
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
      <TableHeadBgChange>
        <TableHead>
          <TableHeadItems b={b} />
        </TableHead>
        {songs.idArray.map((id) => {
          const item = songs.byId[id];
          return <Track key={item.id} listSong={listSong} song={item} />;
        })}
      </TableHeadBgChange>
    </div>
  ) : (
    <ListItemNotExist b={b} />
  );
}

export default AudiosContainer;
