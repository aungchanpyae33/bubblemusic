"use client";

import { getLikedIdClient } from "@/database/client-data";
import {
  likeActionState,
  setLikeAction,
  useLikeActionStore,
} from "@/lib/zustand";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

interface LikeContextProps {
  isLike: boolean;
  setLikeAction: (value: Record<string, boolean>) => void;
}

export const LikeContext = createContext<LikeContextProps | undefined>(undefined);

export const useLikeContext = () => {
  const context = useContext(LikeContext);
  if (context === undefined) {
    throw new Error("useLikeContext must be used within a LikeContext.Provider");
  }
  return context;
};
function ContextLike({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const setLikeAction = useLikeActionStore(
    (state: setLikeAction) => state.setLikeAction,
  );
  // zustand store that listen with id(to listend toggle case )
  const likeAction = useLikeActionStore(
    (state: likeActionState) => state.likeAction[id || ""],
  );
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["liked-id"],
    queryFn: () => getLikedIdClient(),
  });
  const { data, error } = queryData || {};
  // getting direct isLike instead of using useState update
  const isLike = (() => {
    if (likeAction !== undefined) {
      return likeAction;
    }
    if (!data || error || queryError) return false;
    const { userLike } = data;

    const isDataExist = userLike ? userLike.byId[id] : false;
    if (isDataExist) return true;
    return false;
  })();
  const value = { isLike, setLikeAction };
  return <LikeContext.Provider value={value}>{children}</LikeContext.Provider>;
}

export default ContextLike;
