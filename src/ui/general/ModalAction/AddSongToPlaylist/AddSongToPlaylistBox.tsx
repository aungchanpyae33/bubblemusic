"use client";
import {
  addSongsToPlaylist,
  songsToPlaylist,
  useAddSongsToPlaylist,
} from "@/lib/zustand";
import SubOpenContentWrapper from "../ModalWrapper/SubOpenContentWrapper";
import SubOpenToggle from "../ModalWrapper/SubOpenToggle";
import AddSongModalBoxContainer from "./AddSongModalBoxContainer";

function AddSongToPlaylistBox() {
  return (
    <SubOpenContentWrapper
      selector={(state: songsToPlaylist) =>
        Object.values(state.songsToPlaylist)[0]
      }
      useStore={useAddSongsToPlaylist}
    >
      <SubOpenToggle
        selector={(state: addSongsToPlaylist) => state.addSongsToPlaylist}
        useStore={useAddSongsToPlaylist}
      >
        <AddSongModalBoxContainer />
      </SubOpenToggle>
    </SubOpenContentWrapper>
  );
}

export default AddSongToPlaylistBox;
