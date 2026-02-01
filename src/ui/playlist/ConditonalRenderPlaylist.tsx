"use client";

import { getUserLibClient } from "@/database/client-data";
import { useQuery } from "@tanstack/react-query";

function ConditonalRenderPlaylist({
  id,
  OwnEdit,
  View,
}: {
  id: string;
  OwnEdit: React.JSX.Element;
  View: React.JSX.Element;
}) {
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["user-library"],
    queryFn: () => getUserLibClient(),
  });
  if (!queryData || queryError) return;
  const { data, error } = queryData || {};
  if (!data || error) return;
  const { userLib } = data;
  if (!userLib) return;
  const { source } = userLib.byId[id] ?? { source: "none" };
  return source === "create" ? OwnEdit : View;
}

export default ConditonalRenderPlaylist;
