//  As safari reject audio play if play does not come from click event
import { RefObject } from "react";
import { safeAudioPlay } from "@/lib/safeAudioPlay";

export function audioPlayTriggerIos(
  audioElRef: RefObject<HTMLAudioElement | null>,
) {
  if (!audioElRef.current) return null;
  safeAudioPlay(audioElRef.current);
}
