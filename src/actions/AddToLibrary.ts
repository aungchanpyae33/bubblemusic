"use server";
import type { UserLibReturn } from "@/database/data-types-return";
import { createClient } from "@/database/server";
import type { MediaItemType } from "../../database.types-fest";
import { normalizeById } from "@/lib/returnById";
import { checkUserExist } from "@/lib/checkUserExist";
import { returnErrorResponse } from "@/lib/returnErrorResponse";

export const addToLibrary = async (
  id: string,
  type: MediaItemType,
): Promise<UserLibReturn> => {
  try {
    const supabase = await createClient();
    await checkUserExist(supabase);
    const { data, error } = await supabase.rpc("add_to_library", {
      p_item_id: id,
      p_item_type: type,
    });
    if (error) throw error;
    if (!data) throw new Error("not success");
    const userLib = {
      userLib: normalizeById(data),
    };
    return { data: userLib, error };
  } catch (error) {
    return returnErrorResponse(error);
  }
};
