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
const StartLoadEvent = ["loadstart", "waiting", "seeking"];
const StopLoadEvent = ["playing", "seeked", "canplay", "error"];
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
    StartLoadEvent.forEach((startLoad) =>
      audio.addEventListener(startLoad, start),
    );
    StopLoadEvent.forEach((stopLoad) => audio.addEventListener(stopLoad, stop));

    return () => {
      StartLoadEvent.forEach((startLoad) =>
        audio.removeEventListener(startLoad, start),
      );
      StopLoadEvent.forEach((stopLoad) =>
        audio.removeEventListener(stopLoad, stop),
      );
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
