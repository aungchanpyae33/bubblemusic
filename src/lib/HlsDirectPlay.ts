import { useAudioElementContext } from "@/ui/Footer/audio/AudioWrapper";

export const HlsDirectPlay = (url: string) => {
  const { audioElRef } = useAudioElementContext();
  if (!audioElRef!.current) return;
  const m3u8Url = url.replace("init.mp4", "media.m3u8");
  audioElRef.current.load();
  audioElRef.current.src = m3u8Url;
  audioElRef.current.onloadedmetadata = () => {
    audioElRef
      .current!.play()
      .catch((err) => console.error("Playback failed:", err));
  };
};
