import {
  createToPlaylistModalBoxAction,
  useCreateToPlaylist,
} from "@/lib/zustand";
import IconWrapper from "@/ui/general/IconWrapper";
import { Plus } from "lucide-react";
import { useRef } from "react";

function InitCreateButton() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const createToPlaylistModalBoxAction = useCreateToPlaylist(
    (state: createToPlaylistModalBoxAction) =>
      state.createToPlaylistModalBoxAction,
  );
  return (
    <button
      className="mr-2"
      onClick={() =>
        createToPlaylistModalBoxAction({ originParentTriggerRef: buttonRef })
      }
    >
      <IconWrapper size="large" Icon={Plus} />
    </button>
  );
}

export default InitCreateButton;
