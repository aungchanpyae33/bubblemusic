import { useContext } from "react";
import OptionItem from "@/ui/general/optionBox/OptionItem";
import OptionButton from "@/ui/general/optionBox/OptionButton";
import OptionIconEl from "@/ui/general/optionBox/OptionIconEl";
import IconWrapper from "@/ui/general/IconWrapper";
import { SquarePen } from "lucide-react";

import { editToPlaylistAction, useEditToPlaylist } from "@/lib/zustand";
import { SongListContext, SongListValue } from "./ContextSongListContainer";

function EditToPlaylistChild() {
  const { id, name } = useContext(SongListContext) as SongListValue;

  const EditToPlaylistAction = useEditToPlaylist(
    (state: editToPlaylistAction) => state.editToPlaylistAction,
  );
  if (!id || !name) return null;

  function handleEdit() {
    EditToPlaylistAction({ id, name });
  }
  return (
    <OptionItem>
      <OptionButton action={handleEdit}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={SquarePen} />
        </OptionIconEl>
        <span>edit the playlist</span>
      </OptionButton>
    </OptionItem>
  );
}

function EditToPlaylist() {
  const { source } = useContext(SongListContext) as SongListValue;

  if (source === "none" || source === "reference") return null;

  return <EditToPlaylistChild />;
}

export default EditToPlaylist;
