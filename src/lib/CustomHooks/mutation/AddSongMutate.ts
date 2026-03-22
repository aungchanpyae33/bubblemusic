import { insertSongtoPlaylist } from "@/actions/addSongsToPlaylist";
import type { UserLibReturn } from "@/database/data-types-return";
import { closeModalBox } from "@/lib/closeModalBox";
import {
  songExistActionModalBox,
  useIsExistSongsModalBox,
} from "@/lib/zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RefObject } from "react";

const useAddSongMutate = (
  playlistId: string,
  cover_url: string | null,
  originParentTriggerRef: RefObject<HTMLElement | null>,
) => {
  const setIsSongExistModalBox = useIsExistSongsModalBox(
    (state: songExistActionModalBox) => state.setIsSongExistModalBox,
  );
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
    onSettled: () => {
      closeModalBox(setIsSongExistModalBox, originParentTriggerRef);
    },
  });

  return mutation;
};

export default useAddSongMutate;
