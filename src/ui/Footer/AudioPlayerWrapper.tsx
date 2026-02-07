"use client";
import ContextMediaAudioFull from "@/lib/MediaSource/ContextMediaAudioFull";
import {
  isFallBackAudioState,
  useInstantFallBackAudioFull,
} from "@/lib/zustand";
import dynamic from "next/dynamic";
const AudioPlayerLazy = dynamic(() => import("./AudioPLayer"), {});
function AudioPlayerWrapper() {
  const isFullBackAudio = useInstantFallBackAudioFull(
    (state: isFallBackAudioState) => state.isFallBackAudio,
  );
  return (
    <ContextMediaAudioFull>
      {isFullBackAudio && <AudioPlayerLazy start={isFullBackAudio} />}
    </ContextMediaAudioFull>
  );
}

export default AudioPlayerWrapper;
