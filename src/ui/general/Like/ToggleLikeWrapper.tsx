"use client";

import { addLike } from "@/actions/addLike";
import { removeLike } from "@/actions/removeLike";
import { useLikeContext } from "@/Context/ContextLike";
import { ReactNode } from "react";
interface ToggleLikeWrapperProps {
  songId: string;
  children: (handleLike: () => Promise<void>) => ReactNode;
}

function ToggleLikeWrapper({ songId, children }: ToggleLikeWrapperProps) {
  const { isLike, setLikeAction } = useLikeContext();
  const addLikeAction = addLike.bind(null, songId);
  const removeLikeAction = removeLike.bind(null, songId);
  async function handleLike() {
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
