import IconWrapper from "@/ui/general/IconWrapper";
import OptionButton from "@/ui/general/optionBox/OptionButton";
import OptionIconEl from "@/ui/general/optionBox/OptionIconEl";
import OptionItem from "@/ui/general/optionBox/OptionItem";
import OptionSubArrow from "@/ui/general/optionBox/OptionSubArrow";
import OptionText from "@/ui/general/optionBox/OptionText";
import MoreSubOption from "@/ui/trackComponent/MoreSubOption";
import { ChevronRight, Palette } from "lucide-react";
import ThemeSwitchSubItem from "./ThemeSwitchSubOption";

function ThemeSwitchItem() {
  return (
    <MoreSubOption
      stackNum={1}
      triggerEl={
        <OptionItem isSub={true}>
          <OptionIconEl>
            <IconWrapper size="small" Icon={Palette} />
          </OptionIconEl>
          <OptionText>Theme</OptionText>
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
