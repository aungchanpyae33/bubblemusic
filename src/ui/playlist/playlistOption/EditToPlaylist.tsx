import { useContext } from "react";
import OptionItem from "@/ui/general/optionBox/OptionItem";
import OptionButton from "@/ui/general/optionBox/OptionButton";
import OptionIconEl from "@/ui/general/optionBox/OptionIconEl";
import IconWrapper from "@/ui/general/IconWrapper";
import { SquarePen } from "lucide-react";

import { editToPlaylistAction, useEditToPlaylist } from "@/lib/zustand";
import { SongListContext, SongListValue } from "./ContextSongListContainer";
import { useTranslations } from "next-intl";
import OptionText from "@/ui/general/optionBox/OptionText";

function EditToPlaylistChild() {
  const b = useTranslations("block");
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
        <OptionText>{b("editPlaylist")}</OptionText>
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
