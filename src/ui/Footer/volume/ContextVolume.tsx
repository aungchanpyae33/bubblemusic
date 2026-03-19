import React, {
  createContext,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ContextVolumeProps {
  children: React.ReactNode;
}
interface contextProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}
const volumeContext = createContext<contextProps | undefined>(undefined);

export const useVolumeContext = () => {
  const context = useContext(volumeContext);
  if (context === undefined) {
    throw new Error(
      "useVolumeContext must be used within a volumeContext.Provider",
    );
  }
  return context;
};
function ContextVolume({ children }: ContextVolumeProps) {
  const [open, setOpen] = useState(false);
  const value = { open, setOpen };
  return (
    <div className="flex max-w-[250px] lg:w-full items-center  group  p-1 ">
      <volumeContext.Provider value={value}>{children}</volumeContext.Provider>
    </div>
  );
}

export default ContextVolume;
