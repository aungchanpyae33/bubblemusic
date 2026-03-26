"use client";
import {
  createToPlaylistModalBox,
  createToPlaylistModalBoxAction,
  useCreateToPlaylist,
} from "@/lib/zustand";
import SubOpenContentWrapper from "../ModalWrapper/SubOpenContentWrapper";
import SubOpenToggle from "../ModalWrapper/SubOpenToggle";
import PlaylistCreateForm from "./PlaylistCreateForm";
import { useTranslations } from "next-intl";
function CreatePlaylistBox() {
  const b = useTranslations("block");
  const data = useCreateToPlaylist(
    (state: createToPlaylistModalBox) => state.createToPlaylistModalBox,
  );
  if (!data) return null;
  const { originParentTriggerRef } = data;
  return (
    <SubOpenContentWrapper
      selector={(state: createToPlaylistModalBox) =>
        state.createToPlaylistModalBox
      }
      useStore={useCreateToPlaylist}
    >
      <SubOpenToggle
        originParentTriggerRef={originParentTriggerRef}
        selector={(state: createToPlaylistModalBoxAction) =>
          state.createToPlaylistModalBoxAction
        }
        headerText={b("newPlaylist")}
        useStore={useCreateToPlaylist}
      >
        <PlaylistCreateForm />
      </SubOpenToggle>
    </SubOpenContentWrapper>
  );
}

export default CreatePlaylistBox;
