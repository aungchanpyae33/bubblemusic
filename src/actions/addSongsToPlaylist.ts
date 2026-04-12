"use server";
import type { ListSongsReturn } from "@/database/data-types-return";
import { createClient } from "@/database/server";
import { checkUserExist } from "@/lib/checkUserExist";
import { normalizeById } from "@/lib/returnById";
import { returnErrorResponse } from "@/lib/returnErrorResponse";

export const insertSongtoPlaylist = async ({
  playlistId,
  songId,
}: {
  playlistId: string;
  songId: string;
}): Promise<ListSongsReturn> => {
  try {
    const supabase = await createClient();
    await checkUserExist(supabase);
    const { data, error } = await supabase.rpc("add_playlist_song", {
      p_id: playlistId,
      s_id: songId,
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
