"use server";
import type { UserLibReturn } from "@/database/data-types-return";
import { createClient } from "@/database/server";
import { normalizeById } from "@/lib/returnById";

export const insertDataAction = async (
  playlist_name: string,
  p_is_public: boolean,
): Promise<UserLibReturn> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("insert_playlist", {
      playlist_name,
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
