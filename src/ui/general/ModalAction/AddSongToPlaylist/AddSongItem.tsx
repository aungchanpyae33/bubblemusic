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

function AddSongItem({
  playlistSongs,
}: {
  playlistSongs: {
    id: string;
    name: string;
  };
}) {
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

  const mutation = useAddSongMutate(
    playlistId,
    noExistCover,
    originParentTriggerRef,
  );

  async function handleAdd() {
    closeModalBox(addSongsToPlaylistModalBox, originParentTriggerRef);
    const { exists, error } = await checkSongsBeforeAddClient({
      playlistId: playlistId,
      songId: songId,
    });
    if (error) return;
    if (!exists && !error) {
      mutation.mutate({
        playlistId: playlistId,
        songId: songId,
      });
    } else {
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
      <button className=" block max-w-full truncate" onClick={handleAdd}>
        {playlistSongs.name}
      </button>
    </div>
  );
}

export default AddSongItem;
