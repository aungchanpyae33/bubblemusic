"use server";

import { createClient } from "@/database/server";
import { checkUserExist } from "@/lib/checkUserExist";

export const setSongEmbedding = async (songsId: string[]) => {
  try {
    const supabase = await createClient();
    await checkUserExist(supabase);
    const { error } = await supabase.rpc("update_user_song_embedding", {
      p_song_ids: songsId,
    });
    return { error };
  } catch (error) {
    return { error };
  }
};
