"use server";

import { createClient } from "@/database/server";
import { checkUserExist } from "@/lib/checkUserExist";

export const removeLike = async (songId: string) => {
  try {
    const supabase = await createClient();
    await checkUserExist(supabase);
    const { error } = await supabase.rpc("removelike", {
      song_id: songId,
    });
    return { error };
  } catch (error) {
    return { error };
  }
};
