import IconWrapper from "@/ui/general/IconWrapper";
import { ChevronRight, Palette } from "lucide-react";
import ThemeSwitchSubItem from "./ThemeSwitchSubOption";
import { useTranslations } from "next-intl";
import OptionItem from "../../OptionUI/OptionItem";
import OptionIconEl from "../../OptionUI/OptionIconEl";
import OptionText from "../../OptionUI/OptionText";
import OptionSubArrow from "../../OptionUI/OptionSubArrow";
import MoreSubOption from "@/ui/general/MoreOption/MoreSubOption";

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
