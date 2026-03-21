import IconWrapper from "@/ui/general/IconWrapper";
import { LogOut } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { supabase } from "@/database/supabase";
import {
  usePreviousPlayList,
  useRepeatAndCurrentPlayList,
  useSong,
  useStorePlayListId,
} from "@/lib/zustand";
import { useTopLoader } from "nextjs-toploader";
import { useTranslations } from "next-intl";
import OptionItem from "../OptionUI/OptionItem";
import OptionButton from "../OptionUI/OptionButton";
import OptionIconEl from "../OptionUI/OptionIconEl";
import OptionText from "../OptionUI/OptionText";
function LogoutItem() {
  const b = useTranslations("block");
  const router = useRouter();
  const loader = useTopLoader();
  const resetAllStores = async () => {
    loader.start();
    await supabase.auth.signOut();
    useSong.getState().reset();
    usePreviousPlayList.getState().reset();
    useStorePlayListId.getState().reset();
    useRepeatAndCurrentPlayList.getState().reset();
    router.push("/auth/login");
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
