import { queueState, queueStateAction, useOnlyOneSider } from "@/lib/zustand";
import IconWrapper from "@/ui/general/IconWrapper";
import { Logs } from "lucide-react";

function QueueButton() {
  const isQueue = useOnlyOneSider((state: queueState) => state.isQueue);
  const setIsQueue = useOnlyOneSider(
    (state: queueStateAction) => state.setIsQueue,
  );
  return (
    <button
      className=" p-1 hidden md:inline-block"
      onClick={() => setIsQueue(!isQueue)}
    >
      <IconWrapper Icon={Logs} size="small" />
    </button>
  );
}

export default QueueButton;
