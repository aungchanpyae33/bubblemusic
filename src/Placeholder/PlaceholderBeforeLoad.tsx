"use client";
import { useUserInfoContext } from "@/Context/ContextUserInfo";
import { SongState, useSong } from "@/lib/zustand";
import { useEffect } from "react";

function BeforeLoad() {
  const { immediateLogoutIndicateRef } = useUserInfoContext();
  const url = useSong(
    (state: SongState) =>
      Object.values(state.songCu as Record<string, string>)[0],
  );

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (url && immediateLogoutIndicateRef.current) {
        event.preventDefault();
        return "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [url, immediateLogoutIndicateRef]);
  return null;
}

export default BeforeLoad;
