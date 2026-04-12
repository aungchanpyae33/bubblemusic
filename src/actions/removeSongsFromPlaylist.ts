"use server";
import type { ListSongsReturn } from "@/database/data-types-return";
import { createClient } from "@/database/server";
import { checkUserExist } from "@/lib/checkUserExist";
import { normalizeById } from "@/lib/returnById";
import { returnErrorResponse } from "@/lib/returnErrorResponse";

export const removeSongsFromPlaylist = async ({
  playlistId,
  id,
}: {
  playlistId: string;
  id: string;
}): Promise<ListSongsReturn> => {
  try {
    const supabase = await createClient();
    await checkUserExist(supabase);
    const { data, error } = await supabase.rpc("delete_playlist_song", {
      p_id: playlistId,
      target_id: id,
    });
    if (error) throw error;
    if (!data) throw new Error("not success");
    const mappedData = {
      songs: { ...data.songs, songs: normalizeById(data.songs.songs) },
    };
    return { data: mappedData, error };
  } catch (error) {
    return returnErrorResponse(error);
  }
};
