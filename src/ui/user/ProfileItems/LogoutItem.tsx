import IconWrapper from "@/ui/general/IconWrapper";
import OptionButton from "@/ui/general/optionBox/OptionButton";
import OptionIconEl from "@/ui/general/optionBox/OptionIconEl";
import OptionItem from "@/ui/general/optionBox/OptionItem";
import OptionText from "@/ui/general/optionBox/OptionText";
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
function LogoutItem() {
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
        <OptionText>logout</OptionText>
      </OptionButton>
    </OptionItem>
  );
}

export default LogoutItem;
