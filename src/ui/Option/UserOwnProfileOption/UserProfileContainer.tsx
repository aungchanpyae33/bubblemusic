import type { JwtPayload } from "@supabase/supabase-js";
import OptionContainer from "../OptionUI/OptionContainer";
import NameItem from "../OptionItems/NameItem";
import EmailItem from "../OptionItems/EmailItem";
import ProfileItem from "../OptionItems/ProfileItem";
import ThemeSwitchItem from "../OptionSubItems/ThemeSwitch/ThemeSwitchItem";
import LanguageSwitchItem from "../OptionSubItems/LanguageSwitch/LanguagaeSwtichItem";
import LogoutItem from "../OptionItems/LogoutItem";

function UserProfileContainer({ user }: { user: JwtPayload }) {
  const name = user.user_metadata.first_name + user.user_metadata.last_name;
  const email = user.user_metadata.email;
  const id = user.sub;
  return (
    <OptionContainer>
      <NameItem name={name} />
      <EmailItem email={email} />
      <ProfileItem id={id} />
      <ThemeSwitchItem />
      <LanguageSwitchItem />
      <LogoutItem />
    </OptionContainer>
  );
}

export default UserProfileContainer;
