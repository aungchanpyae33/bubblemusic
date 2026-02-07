import { getUserLibClient } from "@/database/client-data";
import { useQuery } from "@tanstack/react-query";

function CheckType({ id }: { id: string }) {
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["user-library"],
    queryFn: () => getUserLibClient(),
  });
  if (queryError) return;
  const { data, error } = queryData || {};
  if (!data || error) return;
  const { userLib } = data;
  if (!userLib) return;
  const is_public = userLib.byId[id].is_public;
  const checkType = is_public ? "အများ" : "သီးသန့်";
  return (
    <fieldset className=" my-2">
      <legend className="mb-2 font-medium">မြင်သာမှု</legend>
      <div className="flex flex-wrap gap-2">
        {["အများ", "သီးသန့်"].map((check) => {
          return (
            <label key={check} className="cursor-pointer">
              <input
                type="radio"
                name="typeCheck"
                value={check}
                defaultChecked={checkType === check}
                className="sr-only peer"
              />
              <div className="px-4 py-2 rounded-lg border-2 border-borderFull transition-colors duration-300  font-medium peer-checked:bg-brand peer-checked:text-foreground">
                {check}
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default CheckType;
