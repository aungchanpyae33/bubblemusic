"use server";
import type { UserLibReturn } from "@/database/data-types-return";
import { createClient } from "@/database/server";
import { checkUserExist } from "@/lib/checkUserExist";
import { normalizeById } from "@/lib/returnById";
import { returnErrorResponse } from "@/lib/returnErrorResponse";

export const removeFromLibrary = async (
  id: string,
  source: "create" | "reference",
): Promise<UserLibReturn> => {
  try {
    const supabase = await createClient();
    await checkUserExist(supabase);
    if (source === "create") {
      const { data, error } = await supabase.rpc("delete_user_playlist_item", {
        p_item_id: id,
      });
      if (error) throw error;
      if (!data) throw new Error("not success");
      const userLib = {
        userLib: normalizeById(data),
      };
      return { data: userLib, error };
    } else {
      const { data, error } = await supabase.rpc("delete_user_reference_item", {
        refer_item_id: id,
      });
      if (error) throw error;
      if (!data) throw new Error("not success");
      const userLib = {
        userLib: normalizeById(data),
      };
      return { data: userLib, error };
    }
  } catch (error) {
    return returnErrorResponse(error);
  }
};
