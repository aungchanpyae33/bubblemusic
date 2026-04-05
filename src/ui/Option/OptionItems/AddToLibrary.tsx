import IconWrapper from "@/ui/general/IconWrapper";
import { BookmarkPlus } from "lucide-react";

import { addToLibrary } from "@/actions/AddToLibrary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { toast } from "sonner";
import type { MediaItemType } from "../../../../database.types-fest";
async function addToLibraryFn({
  id,
  type,
}: {
  id: string;
  type: MediaItemType;
}) {
  const { data, error } = await addToLibrary(id, type);
  if (!data || error) {
    const err = new Error("action-failed");
    err.name = "custom_error";
    throw err;
  }
  return data;
}
function AddToLibraryChild() {
  const { id, type } = useSongListContext();
  const b = useTranslations("block");
  const toa = useTranslations("Toast");
  const { originParentTriggerRef } = useOriginParentTriggerContext();
  const { userInfo } = useUserInfoContext();
  const signInModalBoxAction = useSignInModalBox(
    (state: SignInModalBoxAction) => state.signInModalBoxAction,
  );
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addToLibraryFn,
    onMutate: () => {
      // This runs BEFORE mutationFn
      const toastId = toast.loading(toa("loading")); // trigger loading toast
      return { toastId }; // pass to onSuccess / onError
    },
    onSuccess: (data, _, context) => {
      queryClient.setQueryData(["user-library"], {
        data,
        error: null,
      });

      if (!context.toastId) return;
      toast.success(toa("addToLib.addToLibSuccess"), {
        id: context.toastId,
      });
    },
    onError: (_, __, context) => {
      if (!context?.toastId) return;
      toast.error(toa("error"), { id: context.toastId });
    },
  });
  function handleAdd() {
    if (!userInfo) {
      return guardToSignIn({ originParentTriggerRef }, signInModalBoxAction);
    }
    mutation.mutate({ id, type });
  }

  return (
    <OptionItem>
      <OptionButton action={handleAdd}>
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
