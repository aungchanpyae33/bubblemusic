"use server";
import { createClient } from "@/database/server";
import { checkUserExist } from "@/lib/checkUserExist";
export const addRecentlySong = async (id: string) => {
  try {
    const supabase = await createClient();
    await checkUserExist(supabase);
    const { error } = await supabase.rpc("add_recent_song", {
      p_song_id: id,
    });
    return { error };
  } catch (error) {
    return { error };
  }
};
