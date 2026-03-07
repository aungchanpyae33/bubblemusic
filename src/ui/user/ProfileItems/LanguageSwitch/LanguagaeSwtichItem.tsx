import IconWrapper from "@/ui/general/IconWrapper";
import OptionIconEl from "@/ui/general/optionBox/OptionIconEl";
import OptionItem from "@/ui/general/optionBox/OptionItem";
import OptionSubArrow from "@/ui/general/optionBox/OptionSubArrow";
import OptionText from "@/ui/general/optionBox/OptionText";
import MoreSubOption from "@/ui/trackComponent/MoreSubOption";
import { ChevronRight, Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSub from "./LanguageSwitchSubOption";

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
