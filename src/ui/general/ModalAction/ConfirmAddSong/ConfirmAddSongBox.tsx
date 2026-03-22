"use client";

import {
  isSongExistModalBox,
  songExistActionModalBox,
  useIsExistSongsModalBox,
} from "@/lib/zustand";
import SubOpenContentWrapper from "../ModalWrapper/SubOpenContentWrapper";
import SubOpenToggle from "../ModalWrapper/SubOpenToggle";
import ConfirmAddSong from "./ConfirmAddSong";

function ConfirmAddSongBox() {
  const data = useIsExistSongsModalBox(
    (state: isSongExistModalBox) => state.isSongExistModalBox,
  );
  if (!data) return null;
  const { originParentTriggerRef } = data;
  return (
    <SubOpenContentWrapper
      selector={(state: isSongExistModalBox) => state.isSongExistModalBox}
      useStore={useIsExistSongsModalBox}
    >
      <SubOpenToggle
        selector={(state: songExistActionModalBox) =>
          state.setIsSongExistModalBox
        }
        originParentTriggerRef={originParentTriggerRef}
        useStore={useIsExistSongsModalBox}
      >
        <ConfirmAddSong />
      </SubOpenToggle>
    </SubOpenContentWrapper>
  );
}

export default ConfirmAddSongBox;
