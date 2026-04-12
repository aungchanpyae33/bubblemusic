import {
  addSongsToPlaylistModalBox,
  songExistActionModalBox,
  songsToPlaylistModalBox,
  songsToPlaylistModalBoxProps,
  useAddSongsToPlaylistModalBox,
  useIsExistSongsModalBox,
} from "@/lib/zustand";
import useAddSongMutate from "@/lib/CustomHooks/mutation/AddSongMutate";
import {
  checkSongsBeforeAddClient,
  getUserLibClient,
} from "@/database/client-data";
import { useQuery } from "@tanstack/react-query";
import { closeModalBox } from "@/lib/closeModalBox";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import Button from "@/components/button/Button";

function AddSongItem({
  playlistSongs,
}: {
  playlistSongs: {
    id: string;
    name: string;
  };
}) {
  const toa = useTranslations("Toast");
  const l = useTranslations("ListTitle");
  const playlistId = playlistSongs.id;
  const setIsSongExistModalBox = useIsExistSongsModalBox(
    (state: songExistActionModalBox) => state.setIsSongExistModalBox,
  );
  const { songId, cover_url, originParentTriggerRef } =
    useAddSongsToPlaylistModalBox(
      (state: songsToPlaylistModalBox) => state.songsToPlaylistModalBox,
    ) as songsToPlaylistModalBoxProps;
  const addSongsToPlaylistModalBox = useAddSongsToPlaylistModalBox(
    (state: addSongsToPlaylistModalBox) => state.addSongsToPlaylistModalBox,
  );
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["user-library"],
    queryFn: () => getUserLibClient(),
  });

  const userLib = queryError ? undefined : queryData?.data?.userLib;
  const playlist = userLib?.byId[playlistId];

  const isListCover = playlist?.cover_url;
  const noExistCover = isListCover ? null : cover_url;

  const mutation = useAddSongMutate(playlistId, noExistCover);

  async function handleAdd() {
    closeModalBox(addSongsToPlaylistModalBox, originParentTriggerRef);
    const toastId = toast.loading(toa("loading")); //
    const { exists, error } = await checkSongsBeforeAddClient({
      playlistId: playlistId,
      songId: songId,
    });
    if (error) {
      toast.error(toa("error"), { id: toastId });
      return;
    }
    if (!exists && !error) {
      mutation.mutate({
        playlistId: playlistId,
        songId: songId,
        toastId: toastId,
      });
    } else {
      toast.dismiss(toastId);
      setIsSongExistModalBox({
        playlistId,
        songId,
        cover_url,
        originParentTriggerRef,
      });
    }
  }
  return (
    <div className=" p-1">
      <Button
        className="w-full  flex items-center p-2 gap-3 rounded-md max-w-full"
        onClick={handleAdd}
      >
        <div className=" p-2 border border-borderFull rounded-md">
          {l("playlist")}
        </div>
        <div className=" text-start flex-1">{playlistSongs.name}</div>
      </Button>
    </div>
  );
}

export default AddSongItem;
