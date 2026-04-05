"use server";
import type { UserLibReturn } from "@/database/data-types-return";
import { createClient } from "@/database/server";
import { checkUserExist } from "@/lib/checkUserExist";
import { normalizeById } from "@/lib/returnById";
import { FormDataTypeCreate } from "@/ui/general/ModalAction/CreatePlaylist/PlaylistCreateForm";

export const insertDataAction = async ({
  playlist_name,
  checkType,
}: {
  playlist_name: string;
  checkType: FormDataTypeCreate["checkType"];
}): Promise<UserLibReturn> => {
  try {
    const supabase = await createClient();
    await checkUserExist(supabase);
    const p_is_public = checkType === "public" ? true : false;
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
