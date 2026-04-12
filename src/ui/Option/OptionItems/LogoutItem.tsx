import IconWrapper from "@/ui/general/IconWrapper";
import { LogOut } from "lucide-react";
import { supabase } from "@/database/supabase";
import { useTopLoader } from "nextjs-toploader";
import { useTranslations } from "next-intl";
import OptionItem from "../OptionUI/OptionItem";
import OptionButton from "../OptionUI/OptionButton";
import OptionIconEl from "../OptionUI/OptionIconEl";
import OptionText from "../OptionUI/OptionText";
function LogoutItem() {
  const b = useTranslations("block");
  const loader = useTopLoader();
  const resetAllStores = async () => {
    loader.start();
    await supabase.auth.signOut();
    // see more action in ContextUserInfo
  };
  return (
    <OptionItem>
      <OptionButton action={resetAllStores}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={LogOut} />
        </OptionIconEl>
        <OptionText>{b("logout")}</OptionText>
      </OptionButton>
    </OptionItem>
  );
}

export default LogoutItem;
