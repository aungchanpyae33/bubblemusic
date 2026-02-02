"use client";
import ContextMediaAudioFull from "@/lib/MediaSource/ContextMediaAudioFull";
import React, { useRef } from "react";
import {
  isFallBackAudioState,
  useInstantFallBackAudioFull,
} from "@/lib/zustand";
import dynamic from "next/dynamic";
const AudioPlayerLazy = dynamic(() => import("./AudioPLayer"), {
  // loading: () => <p className=" bg-red-300 h-[50px]">hello</p>,
});
function AudioPlayerWrapper() {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const isFullBackAudio = useInstantFallBackAudioFull(
    (state: isFallBackAudioState) => state.isFallBackAudio,
  );
  return (
    <ContextMediaAudioFull>
      {isFullBackAudio && (
        <AudioPlayerLazy footerRef={footerRef} start={isFullBackAudio} />
      )}
    </ContextMediaAudioFull>
  );
}

export default AudioPlayerWrapper;
