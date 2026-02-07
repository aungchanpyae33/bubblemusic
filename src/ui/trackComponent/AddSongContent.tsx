"use client";
import AddSongItem from "./AddSongItem";
import { useQuery } from "@tanstack/react-query";
import { getUserLibClient } from "@/database/client-data";
function AddSongContent() {
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["user-library"],
    queryFn: () => getUserLibClient(),
  });
  if (queryError) return;
  const { data, error } = queryData || {};
  if (!data || error) return;
  const { userLib } = data;
  if (!userLib) return;
  return (
    <div className=" space-y-4">
      <h2 className=" py-2 border-b border-seperate-soft">
        Add Songs to the Playlist
      </h2>

      {userLib.idArray.length > 0 &&
        userLib.idArray.map((id) => {
          const item = userLib.byId[id];
          if (item.source !== "create") return;
          return <AddSongItem key={item.id} playlistSongs={item} />;
        })}
    </div>
  );
}

export default AddSongContent;
