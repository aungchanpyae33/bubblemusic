"use client";
import {
  addSongsToPlaylist,
  songsToPlaylist,
  useAddSongsToPlaylist,
} from "@/lib/zustand";
import AddSongModalBoxContainer from "@/ui/trackComponent/AddSongModalBoxContainer";
import SubOpenContentWrapper from "@/ui/trackComponent/SubOpenContentWrapper";

import SubOptionToggle from "@/ui/trackComponent/SubOptionToggle";

function AddSongsToPlaylistBox() {
  return (
    <SubOpenContentWrapper
      selector={(state: songsToPlaylist) =>
        Object.values(state.songsToPlaylist)[0]
      }
      useStore={useAddSongsToPlaylist}
    >
      <SubOptionToggle
        selector={(state: addSongsToPlaylist) => state.addSongsToPlaylist}
        useStore={useAddSongsToPlaylist}
      >
        <AddSongModalBoxContainer />
      </SubOptionToggle>
    </SubOpenContentWrapper>
  );
}

export default AddSongsToPlaylistBox;
