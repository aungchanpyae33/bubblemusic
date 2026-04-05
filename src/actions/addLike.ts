"use server";
import { createClient } from "@/database/server";
import { checkUserExist } from "@/lib/checkUserExist";

export const addLike = async (songId: string) => {
  try {
    const supabase = await createClient();
    await checkUserExist(supabase);
    const { error } = await supabase.rpc("addlike", {
      p_song_id: songId,
    });

    return { error };
  } catch (error) {
    return { error };
  }
};
