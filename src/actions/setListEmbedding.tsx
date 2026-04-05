"use server";

import { createClient } from "@/database/server";
import { checkUserExist } from "@/lib/checkUserExist";

export const setListEmbedding = async (
  type: "album" | "playlist" | "artist",
  id: string,
) => {
  try {
    const supabase = await createClient();
    await checkUserExist(supabase);
    const { error } = await supabase.rpc("update_user_embedding_list", {
      p_type: type,
      p_id: id,
    });
    return { error };
  } catch (error) {
    return { error };
  }
};
