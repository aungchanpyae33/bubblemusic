import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface AudioLoadingContextProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
const AudioLoadingContext = createContext<AudioLoadingContextProps | undefined>(
  undefined,
);

export const useAudioLoadingContext = () => {
  const context = useContext(AudioLoadingContext);
  if (context === undefined) {
    throw new Error(
      "useAudioLoadingContext must be used within a AudioLoadingContext",
    );
  }
  return context;
};

function ContextAudioLoading({
  children,
  audioElRef,
}: {
  children: ReactNode;
  audioElRef: React.RefObject<HTMLAudioElement | null>;
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const audio = audioElRef.current;
    if (!audio) return;

    function start() {
      setLoading(true);
    }
    function stop() {
      setLoading(false);
    }

    audio.addEventListener("loadstart", start);
    audio.addEventListener("waiting", start);
    audio.addEventListener("seeking", start);
    audio.addEventListener("stalled", start);

    audio.addEventListener("playing", stop);
    audio.addEventListener("seeked", stop);
    audio.addEventListener("canplay", stop);

    return () => {
      audio.removeEventListener("loadstart", start);
      audio.removeEventListener("waiting", start);
      audio.removeEventListener("seeking", start);
      audio.removeEventListener("stalled", start);

      audio.removeEventListener("playing", stop);
      audio.removeEventListener("seeked", stop);
      audio.removeEventListener("canplay", stop);
    };
  }, [audioElRef]);
  const value = { loading, setLoading };
  return (
    <AudioLoadingContext.Provider value={value}>
      {children}
    </AudioLoadingContext.Provider>
  );
}

export default ContextAudioLoading;
