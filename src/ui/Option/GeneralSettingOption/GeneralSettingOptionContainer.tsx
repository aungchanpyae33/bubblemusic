"use client";

import LanguageSwitchItem from "../OptionSubItems/LanguageSwitch/LanguagaeSwtichItem";
import ThemeSwitchItem from "../OptionSubItems/ThemeSwitch/ThemeSwitchItem";
import OptionContainer from "../OptionUI/OptionContainer";

function GeneralSettingOptionContainer() {
  return (
    <OptionContainer>
      <ThemeSwitchItem />
      <LanguageSwitchItem />
    </OptionContainer>
  );
}

export default GeneralSettingOptionContainer;
