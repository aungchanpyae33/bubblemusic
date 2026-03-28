import IconWrapper from "@/ui/general/IconWrapper";
import { BookmarkPlus } from "lucide-react";

import { addToLibrary } from "@/actions/AddToLibrary";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useSongListContext } from "@/Context/ContextSongListContainer";
import OptionItem from "../OptionUI/OptionItem";
import OptionButton from "../OptionUI/OptionButton";
import OptionIconEl from "../OptionUI/OptionIconEl";
import OptionText from "../OptionUI/OptionText";
import { useOriginParentTriggerContext } from "@/Context/ContextOriginParentTrigger";
import { useUserInfoContext } from "@/Context/ContextUserInfo";
import { SignInModalBoxAction, useSignInModalBox } from "@/lib/zustand";
import { guardToSignIn } from "@/lib/guardToSignIn";

function AddToLibraryChild() {
  const { id, type } = useSongListContext();
  const b = useTranslations("block");
  const { originParentTriggerRef } = useOriginParentTriggerContext();
  const { userInfo } = useUserInfoContext();
  const signInModalBoxAction = useSignInModalBox(
    (state: SignInModalBoxAction) => state.signInModalBoxAction,
  );
  const queryClient = useQueryClient();
  async function addToLibraryFn() {
    if (!userInfo) {
      return guardToSignIn({ originParentTriggerRef }, signInModalBoxAction);
    }

    const { data, error } = await addToLibrary(id, type);
    if (error) {
      console.log(error);
    } else {
      if (data) {
        queryClient.setQueryData(["user-library"], {
          data,
          error: null,
        });
      }
    }
  }
  return (
    <OptionItem>
      <OptionButton action={addToLibraryFn}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={BookmarkPlus} />
        </OptionIconEl>
        <OptionText>{b("addToLibrary")}</OptionText>
      </OptionButton>
    </OptionItem>
  );
}

function AddToLibrary() {
  const { source, flag } = useSongListContext();
  if (flag && flag === "user-specific") return null;
  if (source !== "none") return null;
  return <AddToLibraryChild />;
}

export default AddToLibrary;
