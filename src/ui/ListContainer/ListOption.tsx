import { outputRelative } from "@/lib/outputRelative";
import type { listInfo } from "../../../database.types-fest";
import VerticalThreeDots from "../general/ThreeDot/VerticalThreeDots";
import ContextMoreOption from "@/Context/ContextMoreOption";
import ContextSongListContainer from "@/Context/ContextSongListContainer";
import SongListContainerOption from "../Option/OptionUI/SongListContainerOption";
import MoreOption from "../general/MoreOption/MoreOption";
import { ListSongPage } from "@/database/data-types-return";
interface ListOptionProps {
  list: listInfo | ListSongPage;
  inPage?: boolean;
}
function ListOption({ list, inPage }: ListOptionProps) {
  return (
    <div className=" flex items-center justify-center ">
      <ContextMoreOption
        relative={outputRelative(list.related_id, list.related_name, list.type)}
        type={list.type}
      >
        <MoreOption
          triggerEl={<VerticalThreeDots className="fill-current" />}
          targetElement={
            <ContextSongListContainer inPage={inPage} id={list.id} list={list}>
              <SongListContainerOption />
            </ContextSongListContainer>
          }
        />
      </ContextMoreOption>
    </div>
  );
}

export default ListOption;
