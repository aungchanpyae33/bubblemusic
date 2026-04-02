import { RefObject } from "react";
interface AudioSeekedProp {
  per: number;
  duration: number;
  audioElRef: RefObject<HTMLAudioElement | null>;
}
const AudioSeeked = ({ per, duration, audioElRef }: AudioSeekedProp) => {
  const data = per * duration;
  if (!audioElRef.current) return;
  audioElRef.current.currentTime = data;
};
export default AudioSeeked;
