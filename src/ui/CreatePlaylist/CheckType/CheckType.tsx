import { getUserLibClient } from "@/database/client-data";
import { useQuery } from "@tanstack/react-query";
import CheckTypeBase from "./CheckTypeBase";

function CheckType({ id }: { id: string }) {
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["user-library"],
    queryFn: () => getUserLibClient(),
  });
  if (queryError) return null;
  const { data, error } = queryData || {};
  if (!data || error) return null;
  const { userLib } = data;
  if (!userLib) return null;
  const is_public = userLib.byId[id].is_public;
  const defaultValue = is_public ? "public" : "private";
  return <CheckTypeBase defaultValue={defaultValue} />;
}

export default CheckType;
