import IconWrapper from "@/ui/general/IconWrapper";
import { ChevronRight, Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSub from "./LanguageSwitchSubOption";
import OptionItem from "../../OptionUI/OptionItem";
import OptionIconEl from "../../OptionUI/OptionIconEl";
import OptionText from "../../OptionUI/OptionText";
import OptionSubArrow from "../../OptionUI/OptionSubArrow";
import MoreSubOption from "@/ui/general/MoreOption/MoreSubOption";

function LanguageSwitchItem() {
  const b = useTranslations("block");
  return (
    <MoreSubOption
      stackNum={1}
      triggerEl={
        <OptionItem isSub={true}>
          <OptionIconEl>
            <IconWrapper size="small" Icon={Languages} />
          </OptionIconEl>
          <OptionText>{b("changeLanguage")}</OptionText>
          <OptionSubArrow>
            <IconWrapper Icon={ChevronRight} />
          </OptionSubArrow>
        </OptionItem>
      }
      className="w-full"
      targetElement={<LanguageSub />}
    />
  );
}

export default LanguageSwitchItem;
