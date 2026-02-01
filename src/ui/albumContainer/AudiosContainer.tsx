import Track from "../trackComponent/Track";
import TableHeadBgChange from "./TableHeadBgChange";
import TableHead from "./TableHead";
import IconWrapper from "../general/IconWrapper";
import { Clock } from "lucide-react";
import type { ListSongPage } from "@/database/data-types-return";

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
function AudiosContainer({
  description,
  listSong,
}: {
  description: string;
  listSong: ListSongPage;
}) {
  const songs = listSong.songs;
  //for accessbility
  // const dataInc = useRef(0);
  // const rowCell = useRef(1);

  return songs && songs.idArray.length > 0 ? (
    <div className=" w-full isolate">
      <h2 className=" p-4 text-xl">{description}</h2>
      <TableHeadBgChange>
        <table className="w-full isolate">
          <TableHead>
            <tr className="text-left">
              <th className=" w-14 p-2  text-center">#</th>
              <th className="p-2">ခေါင်းစဉ်</th>
              <th className=" p-2 hidden lg:table-cell ">အယ်လ်ဘမ်</th>
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
    <div> oops there is a empty </div>
  );
}

export default AudiosContainer;
