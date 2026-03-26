"use client";
import {
  addSongsToPlaylistModalBox,
  songsToPlaylistModalBox,
  useAddSongsToPlaylistModalBox,
} from "@/lib/zustand";
import SubOpenContentWrapper from "../ModalWrapper/SubOpenContentWrapper";
import SubOpenToggle from "../ModalWrapper/SubOpenToggle";
import AddSongModalBoxContainer from "./AddSongModalBoxContainer";
import { useTranslations } from "next-intl";

function AddSongToPlaylistBox() {
  const m = useTranslations("ModalBox");
  const data = useAddSongsToPlaylistModalBox(
    (state: songsToPlaylistModalBox) => state.songsToPlaylistModalBox,
  );
  if (!data) return null;
  const { originParentTriggerRef } = data;
  return (
    <SubOpenContentWrapper
      selector={(state: songsToPlaylistModalBox) =>
        state.songsToPlaylistModalBox
      }
      useStore={useAddSongsToPlaylistModalBox}
    >
      <SubOpenToggle
        originParentTriggerRef={originParentTriggerRef}
        selector={(state: addSongsToPlaylistModalBox) =>
          state.addSongsToPlaylistModalBox
        }
        headerText={m("addSongToPlaylist.title")}
        useStore={useAddSongsToPlaylistModalBox}
      >
        <AddSongModalBoxContainer />
      </SubOpenToggle>
    </SubOpenContentWrapper>
  );
}

export default AddSongToPlaylistBox;
