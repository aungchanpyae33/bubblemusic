import React, { createContext, SetStateAction, useContext, useState } from "react";
interface contextProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}
export const Context = createContext<contextProps | undefined>(undefined);

export const useMediaAudioFullContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error(
      "useMediaAudioFullContext must be used within a ContextMediaAudioFull provider",
    );
  }
  return context;
};

function ContextMediaAudioFull({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = { open, setOpen };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default ContextMediaAudioFull;
