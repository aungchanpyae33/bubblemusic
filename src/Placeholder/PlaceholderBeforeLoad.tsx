"use client";
import { SongState, useSong } from "@/lib/zustand";
import { useEffect } from "react";

function BeforeLoad() {
  // const url = useSong(
  //   (state: SongState) =>
  //     Object.values(state.songCu as Record<string, string>)[0]
  // );

  // useEffect(() => {
  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     if (url) {
  //       event.preventDefault();
  //       return "";
  //     }
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [url]);
  return null;
}

export default BeforeLoad;
