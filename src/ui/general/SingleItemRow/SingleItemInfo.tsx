import { outputRelatedType } from "@/lib/ouputRelatedType";
import type { listInfo } from "../../../../database.types-fest";
import ToolTip from "../ToolTip";
import UnderLineLinkHover from "../UnderLineLinkHover";

interface SingleItemInfoProps {
  list: listInfo;
}
function SingleItemInfo({ list }: SingleItemInfoProps) {
  const relativeType = outputRelatedType(list.type);
  return (
    <div className=" min-w-0 max-w-72  flex flex-col justify-center   ">
      <UnderLineLinkHover href={`/${list.type}/${list.id}`}>
        <ToolTip tooltipContent={list.name}>{list.name}</ToolTip>
      </UnderLineLinkHover>

      {relativeType && (
        <UnderLineLinkHover href={`/${relativeType}/${list.related_id}`}>
          {list.related_name}
        </UnderLineLinkHover>
      )}
    </div>
  );
}

export default SingleItemInfo;
