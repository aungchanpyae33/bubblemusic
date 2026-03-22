import { getUserLibClient } from "@/database/client-data";
import { useQuery } from "@tanstack/react-query";

export const useOutputDefaultCheckType = (id: string): "public" | "private" => {
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["user-library"],
    queryFn: () => getUserLibClient(),
  });
  if (queryError) return "public";
  const { data, error } = queryData || {};
  if (!data || error) return "public";
  const { userLib } = data;
  if (!userLib) return "public";
  const is_public = userLib.byId[id].is_public;
  const defaultValue = is_public ? "public" : "private";
  return defaultValue;
};
