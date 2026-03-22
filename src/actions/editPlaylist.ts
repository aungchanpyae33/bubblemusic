"use server";

import { createClient } from "@/database/server";
import { normalizeById } from "@/lib/returnById";
import { FormDataTypeEdit } from "@/ui/general/ModalAction/EditPlaylist/PlaylistEditForm";

export const editPlaylist = async ({
  playlistId,
  playlistName,
  checkType,
}: {
  playlistId: string;
  playlistName: string;
  checkType: FormDataTypeEdit["checkType"];
}) => {
  try {
    const supabase = await createClient();
    const p_is_public = checkType === "public" ? true : false;
    const { data, error } = await supabase.rpc("edit_playlist", {
      p_playlist_id: playlistId,
      p_new_name: playlistName,
      p_is_public,
    });
    if (error) throw error;
    if (!data) throw new Error("not success");
    const userLib = {
      userLib: normalizeById(data),
    };
    return { data: userLib, error };
  } catch (error) {
    return { data: null, error };
  }
};
