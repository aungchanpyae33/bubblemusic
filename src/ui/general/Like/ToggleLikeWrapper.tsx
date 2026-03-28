"use client";

import { addLike } from "@/actions/addLike";
import { removeLike } from "@/actions/removeLike";
import { useLikeContext } from "@/Context/ContextLike";
import { useOriginParentTriggerContext } from "@/Context/ContextOriginParentTrigger";
import { useUserInfoContext } from "@/Context/ContextUserInfo";
import { guardToSignIn } from "@/lib/guardToSignIn";
import { SignInModalBoxAction, useSignInModalBox } from "@/lib/zustand";
import { ReactNode } from "react";
interface ToggleLikeWrapperProps {
  songId: string;
  children: (handleLike: () => Promise<void | null>) => ReactNode;
}

function ToggleLikeWrapper({ songId, children }: ToggleLikeWrapperProps) {
  const { userInfo } = useUserInfoContext();
  const { originParentTriggerRef } = useOriginParentTriggerContext();
  const { isLike, setLikeAction } = useLikeContext();
  const addLikeAction = addLike.bind(null, songId);
  const signInModalBoxAction = useSignInModalBox(
    (state: SignInModalBoxAction) => state.signInModalBoxAction,
  );
  const removeLikeAction = removeLike.bind(null, songId);
  async function handleLike() {
    if (!userInfo) {
      return guardToSignIn({ originParentTriggerRef }, signInModalBoxAction);
    }

    if (isLike) {
      const { error } = await removeLikeAction();
      if (error) {
        console.log("failed to removelike", error);
      } else {
        setLikeAction({ [songId]: false });
      }
    } else {
      const { error } = await addLikeAction();
      if (error) {
        console.log("failed to like", error);
      } else {
        setLikeAction({ [songId]: true });
      }
    }
  }
  return children(handleLike);
}

export default ToggleLikeWrapper;
