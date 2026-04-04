import { insertSongtoPlaylist } from "@/actions/addSongsToPlaylist";
import type { UserLibReturn } from "@/database/data-types-return";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
type AddSongVariables = {
  playlistId: string;
  songId: string;
  toastId: string | number;
};
async function InsertSongtoPlaylistFn({
  playlistId,
  songId,
}: AddSongVariables) {
  const { data, error } = await insertSongtoPlaylist({ playlistId, songId });
  if (!data || error) {
    const err = new Error("action-failed");
    err.name = "custom_error";
    throw err;
  }
  return data;
}
const useAddSongMutate = (playlistId: string, cover_url: string | null) => {
  const toa = useTranslations("Toast");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: InsertSongtoPlaylistFn,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["playlist", playlistId], {
        data,
        error: null,
      });
      if (cover_url) {
        queryClient.setQueryData(
          ["user-library"],
          (oldData: UserLibReturn | undefined) => {
            if (!oldData || !oldData.data || !oldData.data.userLib)
              return oldData;

            const updatedUserLib = {
              ...oldData.data.userLib,
              byId: {
                ...oldData.data.userLib.byId,
                [playlistId]: {
                  ...oldData.data.userLib.byId[playlistId],
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

      if (!variables.toastId) return;
      toast.success(toa("addSongToPlaylist.addSongToPlaylistSuccess"), {
        id: variables.toastId,
      });
    },
    onError: (_, variables) => {
      if (!variables?.toastId) return;
      toast.error(toa("error"), { id: variables.toastId });
    },
  });

  return mutation;
};

export default useAddSongMutate;
