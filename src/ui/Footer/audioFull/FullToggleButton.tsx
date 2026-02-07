import { Context } from "@/lib/MediaSource/ContextMediaAudioFull";
import IconWrapper from "@/ui/general/IconWrapper";
import { Maximize } from "lucide-react";
import React, { useContext } from "react";
type Props = React.ComponentProps<"button">;
function FullToggleButton({ ref }: Props) {
  const { open, setOpen } = useContext(Context);

  return (
    <button
      ref={ref}
      className=" p-1"
      onClick={() => {
        setOpen(!open);
      }}
    >
      <IconWrapper size="small" Icon={Maximize} />
    </button>
  );
}

export default FullToggleButton;
