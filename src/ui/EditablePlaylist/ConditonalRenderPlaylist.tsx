"use client";

import { getUserLibClient } from "@/database/client-data";
import { useQuery } from "@tanstack/react-query";

function ConditonalRenderPlaylist({
  id,
  OwnEditable,
  ViewAsOther,
}: {
  id: string;
  OwnEditable: React.JSX.Element;
  ViewAsOther: React.JSX.Element;
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
  return source === "create" ? OwnEditable : ViewAsOther;
}

export default ConditonalRenderPlaylist;
