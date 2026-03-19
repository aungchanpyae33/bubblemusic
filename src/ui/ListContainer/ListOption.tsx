import { outputRelative } from "@/lib/outputRelative";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import type { listInfo } from "../../../database.types-fest";
import MoreOption from "../trackComponent/MoreOption";
import SongListContainerOption from "../general/optionBox/SongListContainerOption";
import ContextSongListContainer from "../playlist/playlistOption/ContextSongListContainer";
import VerticalThreeDots from "../general/icon/VerticalThreeDots";
interface ListOptionProps {
  list: listInfo;
}
function ListOption({ list }: ListOptionProps) {
  return (
    <div className=" flex items-center justify-center ">
      <MoreOptionContext
        relative={outputRelative(list.related_id, list.related_name)}
      >
        <MoreOption
          triggerEl={<VerticalThreeDots className="fill-current" />}
          targetElement={
            <ContextSongListContainer id={list.id} list={list}>
              <SongListContainerOption />
            </ContextSongListContainer>
          }
        />
      </MoreOptionContext>
    </div>
  );
}

export default ListOption;
