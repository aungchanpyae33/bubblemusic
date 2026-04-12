import { useUserInfoContext } from "@/Context/ContextUserInfo";
import {
  createToPlaylistModalBoxAction,
  useCreateToPlaylist,
} from "@/lib/zustand";
import IconWrapper from "@/ui/general/IconWrapper";
import { Plus } from "lucide-react";

function InitCreateButton() {
  const { userInfo } = useUserInfoContext();
  const createToPlaylistModalBoxAction = useCreateToPlaylist(
    (state: createToPlaylistModalBoxAction) =>
      state.createToPlaylistModalBoxAction,
  );
  if (!userInfo) return null;
  return (
    <button
      className=" absolute h-full flex items-center right-2"
      onClick={() => createToPlaylistModalBoxAction({})}
    >
      <IconWrapper size="large" Icon={Plus} />
    </button>
  );
}

export default InitCreateButton;
