import Track from "../trackComponent/Track";
import TableHeadBgChange from "./TableHeadBgChange";
import TableHead from "./TableHead";
import IconWrapper from "../general/IconWrapper";
import { Clock, Ghost } from "lucide-react";
import type { ListSongPage } from "@/database/data-types-return";
import { getTranslations } from "next-intl/server";
import ListGeneralHeader from "./ListGeneralHeader";

export interface urlProp {
  url: string;
  duration: number;
  sege: number;
  name: string;
}
export interface playlistProp {
  playlistId: string;
  song: urlProp[];
}
async function AudiosContainer({
  description,
  listSong,
}: {
  description: string;
  listSong: ListSongPage;
}) {
  const [b, l] = await Promise.all([
    await getTranslations("block"),
    await getTranslations("ListTitle"),
  ]);
  const songs = listSong.songs;
  //for accessbility
  // const dataInc = useRef(0);
  // const rowCell = useRef(1);

  return songs && songs.idArray.length > 0 ? (
    <div className=" w-full isolate">
      <ListGeneralHeader>{l(description)}</ListGeneralHeader>
      <TableHeadBgChange>
        <table className="w-full isolate my-3">
          <TableHead>
            <tr className="text-left">
              <th className=" w-14 p-2  text-center">#</th>
              <th className="p-2">{b("listHeader.title")}</th>
              <th className=" p-2 hidden lg:table-cell ">
                {b("listHeader.album")}
              </th>
              <th className=" p-2 w-20 hidden sm:table-cell  text-center">
                <span className="flex justify-center">
                  <IconWrapper
                    Icon={Clock}
                    size="small"
                    className=" text-right"
                  />
                </span>
              </th>
              <th className=" p-2 text-end ">#</th>
            </tr>
          </TableHead>

          <tbody>
            {songs &&
              songs.idArray.map((id, index) => {
                const item = songs.byId[`${id}`];
                return (
                  <Track
                    key={item.id}
                    listSong={listSong}
                    song={item}
                    index={index}
                  />
                );
              })}
          </tbody>
        </table>
      </TableHeadBgChange>
    </div>
  ) : (
    <div className=" border border-seperate-soft flex items-center justify-center gap-3  rounded-lg  p-3 my-3 min-h-36">
      <IconWrapper Icon={Ghost} size="exLarge" />
      <span>{b("emptySongList")}</span>
    </div>
  );
}

export default AudiosContainer;
