"use client";

import {
  editToPlaylistModalBox,
  editToPlaylistModalBoxAction,
  useEditToPlaylist,
} from "@/lib/zustand";
import SubOpenContentWrapper from "../ModalWrapper/SubOpenContentWrapper";
import SubOpenToggle from "../ModalWrapper/SubOpenToggle";
import PlaylistEditForm from "./PlaylistEditForm";
import { useTranslations } from "next-intl";
function EditPlaylistBox() {
  const b = useTranslations("block");
  const data = useEditToPlaylist(
    (state: editToPlaylistModalBox) => state.editToPlaylistModalBox,
  );
  if (!data) return null;
  const { originParentTriggerRef } = data;
  return (
    <SubOpenContentWrapper
      selector={(state: editToPlaylistModalBox) => state.editToPlaylistModalBox}
      useStore={useEditToPlaylist}
    >
      <SubOpenToggle
        originParentTriggerRef={originParentTriggerRef}
        selector={(state: editToPlaylistModalBoxAction) =>
          state.editToPlaylistModalBoxAction
        }
        headerText={b("editedPlaylist")}
        useStore={useEditToPlaylist}
      >
        <PlaylistEditForm />
      </SubOpenToggle>
    </SubOpenContentWrapper>
  );
}

export default EditPlaylistBox;
