import IconWrapper from "@/ui/general/IconWrapper";
import { Volume2, VolumeX } from "lucide-react";
import { useVolumeContext } from "./ContextVolume";
import clsx from "clsx";

function VolumeToggleButton({ value }: { value: number }) {
  const { open, setOpen } = useVolumeContext();
  return (
    <button
      className={clsx("lg:hidden", {
        hidden: open,
      })}
      onClick={() => setOpen(true)}
    >
      {" "}
      {value === 100 ? (
        <IconWrapper size="small" Icon={VolumeX} />
      ) : (
        <IconWrapper size="small" Icon={Volume2} />
      )}
    </button>
  );
}

export default VolumeToggleButton;
