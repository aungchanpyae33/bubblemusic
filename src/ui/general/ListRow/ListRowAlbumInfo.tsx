import { Album } from "../../../../database.types-fest";
import ToolTip from "../ToolTip";
import UnderLineLinkHover from "../UnderLineLinkHover";

function ListRowAlbumInfo({ id, name }: Album) {
  return (
    <div className=" min-w-0 max-w-72 hidden lg:flex   items-center">
      <UnderLineLinkHover href={`/album/${id}`}>
        <ToolTip tooltipContent={name}>{name}</ToolTip>
      </UnderLineLinkHover>
    </div>
  );
}

export default ListRowAlbumInfo;
