"use server";
// this is test preview like select songs and insert to list
// it is not currently implemented and it will still preview logic
import { createClient } from "@/database/server";
import { checkUserExist } from "@/lib/checkUserExist";
export const insertDataActionWithSongs = async (queryData: FormData) => {
  const supabase = await createClient();
  await checkUserExist(supabase);
  const playlistname = queryData.get("playlistname");
  if (!playlistname || typeof playlistname !== "string") {
    return { data: null, error: "Invalid playlist name" };
  }
  const { data, error } = await supabase.rpc("insert_playlist_with_songs", {
    playlist_name: playlistname,
    song_ids: [2, 5, 6],
  });
  return { data, error };
};
