import { RefObject } from "react";

export const hlsDirectPlay = (
  url: string,
  audioElRef: RefObject<HTMLAudioElement | null>,
) => {
  // play is already trigger by click with fun called audioPlayTriggerIOS as safari reject audio play if play does not come from click event
  if (!audioElRef.current) return;
  const m3u8Url = url.replace("init.mp4", "media.m3u8");

  audioElRef.current.src = m3u8Url;
  audioElRef.current.load();
};
