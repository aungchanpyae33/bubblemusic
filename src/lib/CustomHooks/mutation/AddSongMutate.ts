import { insertSongtoPlaylist } from "@/actions/addSongsToPlaylist";
import type { UserLibReturn } from "@/database/data-types-return";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddSongMutate = (playlistId: string, cover_url: string | null) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: insertSongtoPlaylist,
    onSuccess: (queryData) => {
      const { data, error } = queryData;
      if (!data) return;
      if (!error) {
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
      }
    },
  });

  return mutation;
};

export default useAddSongMutate;
