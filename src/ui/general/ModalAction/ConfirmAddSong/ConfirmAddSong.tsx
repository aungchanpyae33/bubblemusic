"use client";
import Button from "@/components/button/Button";
import { closeModalBox } from "@/lib/closeModalBox";
import useAddSongMutate from "@/lib/CustomHooks/mutation/AddSongMutate";
import {
  isSongExistModalBox,
  isSongExistModalBoxProps,
  songExistActionModalBox,
  useIsExistSongsModalBox,
} from "@/lib/zustand";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

function ConfirmAddSong() {
  const w = useTranslations("Warning");
  const toa = useTranslations("Toast");
  const { playlistId, songId, originParentTriggerRef, cover_url } =
    useIsExistSongsModalBox(
      (state: isSongExistModalBox) => state.isSongExistModalBox,
    ) as isSongExistModalBoxProps;

  const setIsSongExist = useIsExistSongsModalBox(
    (state: songExistActionModalBox) => state.setIsSongExistModalBox,
  );
  const mutation = useAddSongMutate(playlistId, cover_url);
  function handleAdd() {
    closeModalBox(setIsSongExist, originParentTriggerRef);
    const toastId = toast.loading(toa("loading")); //
    mutation.mutate({
      playlistId,
      songId,
      toastId,
    });
  }
  return (
    <div className=" w-full flex flex-col  gap-3">
      <p>{w("songAlreadyExist")}</p>
      <div className="flex justify-end  gap-3">
        <Button
          onClick={() => {
            closeModalBox(setIsSongExist, originParentTriggerRef);
          }}
        >
          {w("cancel")}
        </Button>
        <Button onClick={handleAdd}>{w("add")}</Button>
      </div>
    </div>
  );
}

export default ConfirmAddSong;
