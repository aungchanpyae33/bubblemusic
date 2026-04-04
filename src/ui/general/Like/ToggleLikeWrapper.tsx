"use client";

import { addLike } from "@/actions/addLike";
import { removeLike } from "@/actions/removeLike";
import { useLikeContext } from "@/Context/ContextLike";
import { useOriginParentTriggerContext } from "@/Context/ContextOriginParentTrigger";
import { useUserInfoContext } from "@/Context/ContextUserInfo";
import { guardToSignIn } from "@/lib/guardToSignIn";
import { SignInModalBoxAction, useSignInModalBox } from "@/lib/zustand";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { toast } from "sonner";
interface ToggleLikeWrapperProps {
  songId: string;
  children: (handleLike: () => null | undefined) => ReactNode;
}

function ToggleLikeWrapper({ songId, children }: ToggleLikeWrapperProps) {
  const toa = useTranslations("Toast");
  const { userInfo } = useUserInfoContext();
  const { originParentTriggerRef } = useOriginParentTriggerContext();
  const { isLike, setLikeAction } = useLikeContext();
  const addLikeAction = addLike.bind(null, songId);
  const signInModalBoxAction = useSignInModalBox(
    (state: SignInModalBoxAction) => state.signInModalBoxAction,
  );
  async function likeAction() {
    if (isLike) {
      const { error } = await removeLikeAction();
      if (error) {
        const err = new Error("action-failed");
        err.name = "custom_error";
        throw err;
      } else {
        setLikeAction({ [songId]: false });
      }
    } else {
      const { error } = await addLikeAction();
      if (error) {
        const err = new Error("action-failed");
        err.name = "custom_error";
        throw err;
      } else {
        setLikeAction({ [songId]: true });
      }
    }
  }
  const removeLikeAction = removeLike.bind(null, songId);

  const mutation = useMutation({
    mutationFn: likeAction,
    onMutate: () => {
      // This runs BEFORE mutationFn
      const toastId = toast.loading(toa("loading")); // trigger loading toast
      return { toastId }; // pass to onSuccess / onError
    },
    onSuccess: (_, __, context) => {
      if (!context.toastId) return;
      toast.success(toa("like.removeLikeSuccess"), {
        id: context.toastId,
      });
    },
    onError: (_, __, context) => {
      if (!context?.toastId) return;
      toast.success(toa("error"), {
        id: context.toastId,
      });
    },
  });

  function handleLike() {
    if (!userInfo) {
      return guardToSignIn({ originParentTriggerRef }, signInModalBoxAction);
    }
    mutation.mutate();
  }

  return children(handleLike);
}

export default ToggleLikeWrapper;
