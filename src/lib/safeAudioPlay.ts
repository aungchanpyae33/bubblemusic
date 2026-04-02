export function safeAudioPlay(audio: HTMLMediaElement) {
  const playPromise = audio.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch((error: unknown) => {
      if (
        error &&
        typeof error === "object" &&
        "name" in error &&
        (error as { name?: string }).name === "AbortError"
      ) {
        return;
      }

      console.error("audio.play() failed", error);
    });
  }
}
