import IconWrapper from "@/ui/general/IconWrapper";
import { SquarePen } from "lucide-react";

import { editToPlaylistModalBoxAction, useEditToPlaylist } from "@/lib/zustand";
import { useTranslations } from "next-intl";
import { useSongListContext } from "@/Context/ContextSongListContainer";
import OptionItem from "../OptionUI/OptionItem";
import OptionIconEl from "../OptionUI/OptionIconEl";
import OptionText from "../OptionUI/OptionText";
import OptionButton from "../OptionUI/OptionButton";
import { useOriginParentTriggerContext } from "@/Context/ContextOriginParentTrigger";

function EditToPlaylistChild() {
  const b = useTranslations("block");
  const { id, name } = useSongListContext();
  const { originParentTriggerRef } = useOriginParentTriggerContext();
  const EditToPlaylistAction = useEditToPlaylist(
    (state: editToPlaylistModalBoxAction) => state.editToPlaylistModalBoxAction,
  );
  if (!id || !name) return null;

  function handleEdit() {
    EditToPlaylistAction({ id, name, originParentTriggerRef });
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
  const { source } = useSongListContext();

  if (source === "none" || source === "reference") return null;

  return <EditToPlaylistChild />;
}

export default EditToPlaylist;
