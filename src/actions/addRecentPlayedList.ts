"use server";

import { createClient } from "@/database/server";
import { normalizeById } from "@/lib/returnById";
import type { GetRecentReturn } from "@/database/data-types-return";
import type { MediaItemType } from "../../database.types-fest";

export const addRecentlyPlayedList = async (
  id: string,
  type: MediaItemType,
): Promise<GetRecentReturn> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("add_recently_played", {
      p_item_id: id,
      p_type: type,
    });
    if (error) throw error;
    if (!data) throw new Error("not success");
    const mappedData = normalizeById(data.recentlyPlayed);
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};
