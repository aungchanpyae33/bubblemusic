"use server";
import type { ListSongsReturn } from "@/database/data-types-return";
import { createClient } from "@/database/server";
import { normalizeById } from "@/lib/returnById";

export const insertSongtoPlaylist = async ({
  playlistId,
  songId,
}: {
  playlistId: string;
  songId: string;
}): Promise<ListSongsReturn> => {
  try {
    const supabase = await createClient();
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
    return { data: null, error: error };
  }
};
