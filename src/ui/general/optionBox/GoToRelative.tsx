"use client";
import OptionItem from "./OptionItem";
import OptionIconEl from "./OptionIconEl";
import IconWrapper from "../IconWrapper";
import { ChevronRight, UserSearch } from "lucide-react";
import NoThankYouPreFetchLink from "../NoThankYouPreFetchLink";
import MoreSubOption from "@/ui/trackComponent/MoreSubOption";
import OptionText from "./OptionText";
import OptionSubArrow from "./OptionSubArrow";
import RelativeSubOption from "./subOption/RelativeSubOption";
import OptionButton from "./OptionButton";
import { useTranslations } from "next-intl";
import { outputRelatedType } from "@/lib/ouputRelatedType";
import { useGoToRelativeContext } from "@/Context/ContextGoToRelative";

function GoToRelative() {
  const b = useTranslations("block");
  const { relative, type } = useGoToRelativeContext();
  if (!relative || !type) return;
  const relatedType = outputRelatedType(type);
  // type will always be "playlist | album | track" because of !relative check above
  // check if is array (usually comefrom track where song has more than one singer)
  if (Array.isArray(relative) && relative.length > 1) {
    // must use moreSubOption if this content comes from parent portal content
    return (
      <MoreSubOption
        stackNum={1}
        triggerEl={
          <OptionItem isSub={true}>
            <OptionIconEl>
              <IconWrapper size="small" Icon={UserSearch} />
            </OptionIconEl>
            <OptionText>{b(`goToRelative.${type}`)}</OptionText>
            <OptionSubArrow>
              <IconWrapper Icon={ChevronRight} />
            </OptionSubArrow>
          </OptionItem>
        }
        className="w-full"
        targetElement={<RelativeSubOption relative={relative} type={type} />}
      />
    );
  } else {
    const relativeId = Array.isArray(relative) ? relative[0].id : relative.id;
    return (
      <OptionItem>
        <NoThankYouPreFetchLink
          href={`/${relatedType}/${relativeId}`}
          className="flex w-full h-full items-center"
        >
          <OptionButton>
            <OptionIconEl>
              <IconWrapper size="small" Icon={UserSearch} />
            </OptionIconEl>

            <OptionText>{b(`goToRelative.${type}`)}</OptionText>
          </OptionButton>
        </NoThankYouPreFetchLink>
      </OptionItem>
    );
  }
}

export default GoToRelative;
