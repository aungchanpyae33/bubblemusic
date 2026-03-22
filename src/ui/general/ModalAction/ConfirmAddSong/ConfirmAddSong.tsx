"use client";
import useAddSongMutate from "@/lib/CustomHooks/mutation/AddSongMutate";
import {
  isSongExistModalBox,
  isSongExistModalBoxProps,
  songExistActionModalBox,
  songsToPlaylistModalBox,
  songsToPlaylistModalBoxProps,
  useAddSongsToPlaylistModalBox,
  useIsExistSongsModalBox,
} from "@/lib/zustand";
import { useTranslations } from "next-intl";
import NotiBox from "../../NotiBox/NotiBox";

function ConfirmAddSong() {
  const w = useTranslations("Warning");
  const { playlistId, songId } = useIsExistSongsModalBox(
    (state: isSongExistModalBox) => state.isSongExistModalBox,
  ) as isSongExistModalBoxProps;
  const { cover_url, originParentTriggerRef } = useAddSongsToPlaylistModalBox(
    (state: songsToPlaylistModalBox) => state.songsToPlaylistModalBox,
  ) as songsToPlaylistModalBoxProps;
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
    <NotiBox>
      <p>{w("songAlreadyExist")}</p>

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
    </NotiBox>
  );
}

export default ConfirmAddSong;
