import type { JwtPayload } from "@supabase/supabase-js";
import OptionContainer from "../general/optionBox/OptionContainer";
import NameItem from "./ProfileItems/NameItem";
import EmailItem from "./ProfileItems/EmailItem";
import ProfileItem from "./ProfileItems/ProfileItem";
import LogoutItem from "./ProfileItems/LogoutItem";
import ThemeSwitchItem from "./ProfileItems/ThemeSwitch/ThemeSwitchItem";
import LanguageSwitchItem from "./ProfileItems/LanguageSwitch/LanguagaeSwtichItem";

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
