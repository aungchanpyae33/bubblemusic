import SongContainer from "./SongContainer";
import TableHeadBgChange from "./TableHeadBgChange";
import ContextSongsData from "./ContextSongsData";
import ConRenderSong from "./ConRenderSong";
import { getTranslations } from "next-intl/server";
import ListGeneralHeader from "./ListGeneralHeader";
import TableHead from "../TableGrid/TableHead";
import TableHeadItems from "../TableGrid/TableHeadItems";
import ListItemNotExist from "../general/NoExist/ListItemNotExist";
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
            <TableHeadBgChange>
              <TableHead>
                <TableHeadItems b={b} />
              </TableHead>
              <SongContainer />
            </TableHeadBgChange>
          </div>
        }
        empty={<ListItemNotExist b={b} />}
      />
    </ContextSongsData>
  );
}

export default EditablePageTrackItemContainer;
