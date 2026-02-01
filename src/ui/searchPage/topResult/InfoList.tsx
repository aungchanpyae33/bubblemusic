import { outputRelatedType } from "@/lib/prototypeOuputRelatedType";
import OfficialBadgeName from "@/ui/albumContainer/OfficialBadgeName";
import UnderLineLinkHover from "@/ui/general/UnderLineLinkHover";
import type { listInfo } from "../../../../database.types-fest";

function InfoList({
  type,
  related_id,
  related_name,
  is_official,
}: {
  type: listInfo["type"];
  related_id: listInfo["related_id"];
  related_name: listInfo["related_name"];
  is_official?: boolean;
}) {
  const relatedType = outputRelatedType(type);

  if (!relatedType) return null;
  return (
    <>
      &bull;
      {is_official && <OfficialBadgeName />}
      <UnderLineLinkHover
        href={`/${relatedType}/${related_id}`}
        prefetch={false}
        className=" ml-1 text-lg font-black  leading-relaxed w-full truncate text-start  "
      >
        {related_name}
      </UnderLineLinkHover>
    </>
  );
}

export default InfoList;
