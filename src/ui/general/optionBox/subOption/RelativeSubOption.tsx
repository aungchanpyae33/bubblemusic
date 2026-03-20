import { outputRelatedType } from "@/lib/ouputRelatedType";
import type { MediaItemType } from "../../../../../database.types-fest";
import NoThankYouPreFetchLink from "../../NoThankYouPreFetchLink";
import { RelativeData } from "../ContextGoToRelative";
import OptionContainer from "../OptionContainer";
import OptionItem from "../OptionItem";
import OptionText from "../OptionText";

function RelativeSubItem({
  relative,
  type,
}: {
  relative: RelativeData;
  type: MediaItemType;
}) {
  const relatedType = outputRelatedType(type);
  return (
    <OptionItem>
      <NoThankYouPreFetchLink
        href={`/${relatedType}/${relative.id}`}
      ></NoThankYouPreFetchLink>
      <OptionText>{relative.name}</OptionText>
    </OptionItem>
  );
}

function RelativeSubOption({
  relative,
  type,
}: {
  relative: RelativeData[];
  type: MediaItemType;
}) {
  return (
    <OptionContainer>
      {relative.map((item) => (
        <RelativeSubItem key={item.id} relative={item} type={type} />
      ))}
    </OptionContainer>
  );
}

export default RelativeSubOption;
