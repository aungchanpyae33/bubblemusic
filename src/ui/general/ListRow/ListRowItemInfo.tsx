import { outputRelatedType } from "@/lib/ouputRelatedType";
import type { Artist, MediaItemType } from "../../../../database.types-fest";
import ArtistWrapper from "../ArtistWrapper";
import ToolTip from "../ToolTip";

interface ListRowItemInfoProps {
  name: string;
  artists: Artist[];
  type: MediaItemType;
}
function ListRowItemInfo({ name, artists, type }: ListRowItemInfoProps) {
  const relativeType = outputRelatedType(type);
  return (
    <div className=" min-w-0 max-w-72   flex flex-col justify-center   ">
      <ToolTip tooltipContent={name}>{name}</ToolTip>
      {relativeType && (
        <ArtistWrapper artists={artists} className=" text-ink-400" />
      )}
    </div>
  );
}

export default ListRowItemInfo;
