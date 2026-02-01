import { removeSongsFromPlaylist } from "@/actions/removeSongsFromPlaylist";
import type {
  ListSongsReturn,
  UserLibReturn,
} from "@/database/data-types-return";
import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
const useRemoveSongMutate = (id: string) => {
  const { setShow } = useContext(ContextMoreOption);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeSongsFromPlaylist,
    onSuccess: (queryData, variables) => {
      const { data, error } = queryData;
      if (!data || error) return;
      if (!error && data) {
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
                [id]: {
                  ...oldData.data.userLib.byId[id],
                  cover_url,
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
      }
      setShow(false);
    },
  });
  return mutation;
};
export default useRemoveSongMutate;
