import IconWrapper from "@/ui/general/IconWrapper";
import OptionIconEl from "@/ui/general/optionBox/OptionIconEl";
import OptionItem from "@/ui/general/optionBox/OptionItem";
import OptionSubArrow from "@/ui/general/optionBox/OptionSubArrow";
import OptionText from "@/ui/general/optionBox/OptionText";
import MoreSubOption from "@/ui/trackComponent/MoreSubOption";
import { ChevronRight, Palette } from "lucide-react";
import ThemeSwitchSubItem from "./ThemeSwitchSubOption";
import { useTranslations } from "next-intl";

function ThemeSwitchItem() {
  const b = useTranslations("block");
  return (
    <MoreSubOption
      stackNum={1}
      triggerEl={
        <OptionItem isSub={true}>
          <OptionIconEl>
            <IconWrapper size="small" Icon={Palette} />
          </OptionIconEl>
          <OptionText>{b("theme")}</OptionText>
          <OptionSubArrow>
            <IconWrapper Icon={ChevronRight} />
          </OptionSubArrow>
        </OptionItem>
      }
      className="w-full"
      targetElement={<ThemeSwitchSubItem />}
    />
  );
}

export default ThemeSwitchItem;
