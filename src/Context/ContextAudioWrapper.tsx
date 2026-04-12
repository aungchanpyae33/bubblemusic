"use client";
import PlaceholderAudioHandler from "@/Placeholder/PlaceholderAudioHandler";
import React, { createContext, ReactNode, useContext, useRef } from "react";
import ContextAudioLoading from "./ContextAudioLoading";

interface AudioElementContextProps {
  audioElRef: React.RefObject<HTMLAudioElement | null>;
}
const AudioElementContext = createContext<AudioElementContextProps | undefined>(
  undefined,
);

export const useAudioElementContext = () => {
  const context = useContext(AudioElementContext);
  if (context === undefined) {
    throw new Error(
      "useAudioElementContext must be used within a AudioElementContext",
    );
  }
  return context;
};

function ContextAudioWrapper({ children }: { children: ReactNode }) {
  const audioElRef = useRef<HTMLAudioElement>(null);
  return (
    <>
      <audio ref={audioElRef} />
      <PlaceholderAudioHandler audioElRef={audioElRef} />
      <AudioElementContext.Provider value={{ audioElRef }}>
        <ContextAudioLoading audioElRef={audioElRef}>
          {children}
        </ContextAudioLoading>
      </AudioElementContext.Provider>
    </>
  );
}

export default ContextAudioWrapper;
