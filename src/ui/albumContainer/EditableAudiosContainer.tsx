import SongContainer from "./SongContainer";
import TableHeadBgChange from "./TableHeadBgChange";
import TableHead from "./TableHead";
import IconWrapper from "../general/IconWrapper";
import { Clock, Ghost } from "lucide-react";
import ContextSongsData from "./ContextSongsData";
import ConRenderSong from "./ConRenderSong";
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
async function EditableAudiosContainer({
  playlistId,
  description,
}: {
  playlistId: string;
  description: string;
}) {
  const [b, l] = await Promise.all([
    await getTranslations("block"),
    await getTranslations("ListTitle"),
  ]);
  //for accessbility
  // const dataInc = useRef(0);
  // const rowCell = useRef(1);
  return (
    <ContextSongsData playlistId={playlistId}>
      <ConRenderSong
        container={
          <div className=" w-full isolate">
            <ListGeneralHeader>{l(description)}</ListGeneralHeader>
            <TableHeadBgChange>
              <table className="w-full isolate">
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
                    <th className=" p-2 text-end">#</th>
                  </tr>
                </TableHead>

                <SongContainer />
              </table>
            </TableHeadBgChange>
          </div>
        }
        empty={
          <div className=" border border-seperate-soft flex items-center justify-center gap-3  rounded-lg  p-3 my-3 min-h-36">
            <IconWrapper Icon={Ghost} size="exLarge" />
            <span>{b("emptySongList")}</span>
          </div>
        }
      />
    </ContextSongsData>
  );
}

export default EditableAudiosContainer;
