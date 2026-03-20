import { outputRelative } from "@/lib/outputRelative";
import type { listInfo } from "../../../database.types-fest";
import MoreOption from "../trackComponent/MoreOption";
import SongListContainerOption from "../general/optionBox/SongListContainerOption";
import VerticalThreeDots from "../general/ThreeDot/VerticalThreeDots";
import ContextMoreOption from "@/Context/ContextMoreOption";
import ContextSongListContainer from "@/Context/ContextSongListContainer";
interface ListOptionProps {
  list: listInfo;
}
function ListOption({ list }: ListOptionProps) {
  return (
    <div className=" flex items-center justify-center ">
      <ContextMoreOption
        relative={outputRelative(list.related_id, list.related_name, list.type)}
        type={list.type}
      >
        <MoreOption
          triggerEl={<VerticalThreeDots className="fill-current" />}
          targetElement={
            <ContextSongListContainer id={list.id} list={list}>
              <SongListContainerOption />
            </ContextSongListContainer>
          }
        />
      </ContextMoreOption>
    </div>
  );
}

export default ListOption;
