"use client";
import useAddSongMutate from "@/lib/CustomHooks/mutation/AddSongMutate";
import {
  isSongExistModalBox,
  isSongExistModalBoxProps,
  songExistActionModalBox,
  useIsExistSongsModalBox,
} from "@/lib/zustand";
import { useTranslations } from "next-intl";

function ConfirmAddSong() {
  const w = useTranslations("Warning");
  const { playlistId, songId, originParentTriggerRef, cover_url } =
    useIsExistSongsModalBox(
      (state: isSongExistModalBox) => state.isSongExistModalBox,
    ) as isSongExistModalBoxProps;

  const setIsSongExist = useIsExistSongsModalBox(
    (state: songExistActionModalBox) => state.setIsSongExistModalBox,
  );
  const mutation = useAddSongMutate(
    playlistId,
    cover_url,
    originParentTriggerRef,
  );
  function handleAdd() {
    mutation.mutate({
      playlistId,
      songId,
    });
  }
  return (
    <div className=" w-full flex justify-end gap-3">
      <button
        className="bg-surface-1 p-2 rounded-lg"
        onClick={() => {
          setIsSongExist(undefined);
        }}
      >
        {" "}
        {w("cancel")}
      </button>
      <button className="bg-surface-1 p-2 rounded-lg" onClick={handleAdd}>
        {w("add")}
      </button>
    </div>
  );
}

export default ConfirmAddSong;
