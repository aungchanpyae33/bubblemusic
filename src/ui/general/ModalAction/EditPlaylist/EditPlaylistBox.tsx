"use client";

import {
  editToPlaylist,
  editToPlaylistAction,
  useEditToPlaylist,
} from "@/lib/zustand";
import SubOpenContentWrapper from "../ModalWrapper/SubOpenContentWrapper";
import SubOpenToggle from "../ModalWrapper/SubOpenToggle";
import EditContentBox from "./EditContentBox";
function EditPlaylistBox() {
  return (
    <SubOpenContentWrapper
      selector={(state: editToPlaylist) =>
        Object.values(state.editToPlaylist)[0]
      }
      useStore={useEditToPlaylist}
    >
      <SubOpenToggle
        selector={(state: editToPlaylistAction) => state.editToPlaylistAction}
        useStore={useEditToPlaylist}
        className="max-w-[480px] w-[94%]"
      >
        <EditContentBox />
      </SubOpenToggle>
    </SubOpenContentWrapper>
  );
}

export default EditPlaylistBox;
