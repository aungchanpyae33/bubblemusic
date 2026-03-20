import SongContainer from "./SongContainer";
import ConRenderSong from "./ConRenderSong";
import { getTranslations } from "next-intl/server";
import ListGeneralHeader from "./ListGeneralHeader";
import TableHead from "../TableGrid/TableHead";
import TableHeadItems from "../TableGrid/TableHeadItems";
import ListItemNotExist from "../general/NoExist/ListItemNotExist";
import ContextSongsData from "@/Context/ContextSongsData";
import ContextTableHeadBgChange from "@/Context/ContextTableHeadBgChange";
async function EditablePageTrackItemContainer({
  playlistId,
  description,
}: {
  playlistId: string;
  description: string;
}) {
  const [b, l] = await Promise.all([
    getTranslations("block"),
    getTranslations("ListTitle"),
  ]);
  return (
    <ContextSongsData playlistId={playlistId}>
      <ConRenderSong
        container={
          <div className=" w-full">
            <ListGeneralHeader>{l(description)}</ListGeneralHeader>
            <ContextTableHeadBgChange>
              <TableHead>
                <TableHeadItems b={b} />
              </TableHead>
              <SongContainer />
            </ContextTableHeadBgChange>
          </div>
        }
        empty={<ListItemNotExist b={b} />}
      />
    </ContextSongsData>
  );
}

export default EditablePageTrackItemContainer;
