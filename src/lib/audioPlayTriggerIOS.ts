//  As safari reject audio play if play does not come from click event
import { RefObject } from "react";

export function audioPlayTriggerIos(
  audioElRef: RefObject<HTMLAudioElement | null>,
) {
  if (!audioElRef.current) return null;
  audioElRef.current.play().catch(() => {});
}
