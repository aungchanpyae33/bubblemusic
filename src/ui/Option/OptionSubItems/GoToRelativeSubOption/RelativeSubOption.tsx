import { outputRelatedType } from "@/lib/ouputRelatedType";
import type { MediaItemType } from "../../../../../database.types-fest";
import { RelativeData } from "@/Context/ContextGoToRelative";
import OptionItem from "../../OptionUI/OptionItem";
import NoThankYouPreFetchLink from "@/ui/general/NoThankYouPreFetchLink";
import OptionText from "../../OptionUI/OptionText";
import OptionContainer from "../../OptionUI/OptionContainer";
import OptionIconEl from "../../OptionUI/OptionIconEl";
import IconWrapper from "@/ui/general/IconWrapper";
import { User } from "lucide-react";
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
        className="flex items-center"
      >
        <OptionIconEl>
          <IconWrapper Icon={User} size="small" />
        </OptionIconEl>
        <OptionText>{relative.name}</OptionText>
      </NoThankYouPreFetchLink>
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
