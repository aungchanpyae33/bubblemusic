import { useMoreOptionStackContext } from "@/Context/ContextMoreOptionStack";
import IconWrapper from "@/ui/general/IconWrapper";
import { Plus } from "lucide-react";

function InitCreateButton({ stackNum }: { stackNum: number }) {
  const { setStack } = useMoreOptionStackContext();
  return (
    <button
      className="mr-2"
      onClick={() => {
        setStack(stackNum);
      }}
    >
      <IconWrapper size="large" Icon={Plus} />
    </button>
  );
}

export default InitCreateButton;
