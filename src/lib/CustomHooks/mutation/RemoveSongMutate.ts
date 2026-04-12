import { removeSongsFromPlaylist } from "@/actions/removeSongsFromPlaylist";
import type {
  ListSongsReturn,
  UserLibReturn,
} from "@/database/data-types-return";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

type RemoveSongType = {
  playlistId: string;
  id: string;
};
async function removeSongsFromPlaylistFn({ playlistId, id }: RemoveSongType) {
  const { data, error } = await removeSongsFromPlaylist({ playlistId, id });
  if (!data || error) {
    const err = new Error("action-failed");
    err.name = "custom_error";
    throw err;
  }
  return data;
}

const useRemoveSongMutate = (id: string) => {
  const toa = useTranslations("Toast");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeSongsFromPlaylistFn,
    onMutate: () => {
      // This runs BEFORE mutationFn
      const toastId = toast.loading(toa("loading")); // trigger loading toast
      return { toastId }; // pass to onSuccess / onError
    },
    onSuccess: (data, variables, context) => {
      const queryData = queryClient.getQueryData<ListSongsReturn>([
        "playlist",
        id,
      ]);

      if (!queryData) return;
      if (!queryData.data) return;
      if (!queryData.data.songs) return;
      const playlistData = queryData.data;
      const { songs } = playlistData;
      if (!songs.songs) return;
      const { songs: scope_songs } = songs;
      const didFirstIdRemoving = scope_songs.idArray[0] === variables.id;
      if (didFirstIdRemoving) {
        queryClient.setQueryData(
          ["user-library"],
          (oldData: UserLibReturn | undefined) => {
            if (!oldData || !oldData.data || !oldData.data.userLib)
              return oldData;

            const cover_url = scope_songs.idArray[1]
              ? scope_songs.byId[scope_songs.idArray[1]].cover_url
              : null;
            const updatedUserLib = {
              ...oldData.data.userLib,
              byId: {
                ...oldData.data.userLib.byId,
                [id]: {
                  ...oldData.data.userLib.byId[id],
                  cover_url,
                },
              },
            };

            return {
              data: {
                userLib: updatedUserLib,
              },
              error: null,
            };
          },
        );
      }
      queryClient.setQueryData(["playlist", id], { data, error: null });
      if (!context.toastId) return;
      toast.success(
        toa("removeSongFromPlaylist.removeSongFromPlaylistSuccess"),
        {
          id: context.toastId,
        },
      );
    },
    onError: (_, __, context) => {
      if (!context?.toastId) return;
      toast.error(toa("error"), { id: context.toastId });
    },
  });
  return mutation;
};
export default useRemoveSongMutate;
