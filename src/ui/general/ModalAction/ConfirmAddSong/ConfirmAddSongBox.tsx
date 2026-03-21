"use client";

import { isSongExist, songExistAction, useIsExistSongs } from "@/lib/zustand";
import SubOpenContentWrapper from "../ModalWrapper/SubOpenContentWrapper";
import SubOpenToggle from "../ModalWrapper/SubOpenToggle";
import ConfirmAddSong from "./ConfirmAddSong";

function ConfirmAddSongBox() {
  return (
    <SubOpenContentWrapper
      selector={(state: isSongExist) => Object.values(state.isSongExist)[0]}
      useStore={useIsExistSongs}
    >
      <SubOpenToggle
        selector={(state: songExistAction) => state.setIsSongExist}
        useStore={useIsExistSongs}
        className=""
      >
        <ConfirmAddSong />
      </SubOpenToggle>
    </SubOpenContentWrapper>
  );
}

export default ConfirmAddSongBox;
