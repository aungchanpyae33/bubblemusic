import { getTranslations } from "next-intl/server";
import TableHead from "../TableHeadGrid/TableHead";
import TableHeadItems from "../TableHeadGrid/TableHeadItems";
import ContextSongsData from "@/Context/ContextSongsData";
import ContextTableHeadBgChange from "@/Context/ContextTableHeadBgChange";
import ConRenderSong from "./ConRenderSong";
import ListGeneralHeader from "../general/ListInfoGeneral/ListGeneralHeader";
import SongContainer from "./SongContainer";
import EmptyGeneral from "../general/NoExist/EmptyGeneral";
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
        empty={<EmptyGeneral />}
      />
    </ContextSongsData>
  );
}

export default EditablePageTrackItemContainer;
