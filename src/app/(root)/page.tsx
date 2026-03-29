import { get } from "@/database/data";
import TapNavi from "@/ui/TapNavi/TapNavi";
import type { GetRecent } from "@/database/data-types-return";
import ListUpFaceGroup from "@/ui/ListUpFaceContainer/ListUpFaceGroup";
import ListItemUpFaceGroup from "@/ui/general/ListItemUpFaceGroup/ListItemUpFaceGroup";
import ListItemUpFaceContainer from "@/ui/general/ListItemUpFaceGroup/ListItemUpFaceContainer";
import RecentlyListContainer from "@/ui/ListUpFaceContainer/RecentlyListContainer";

async function page() {
  const { data, error } = await get();
  if (!data || error) throw new Error("page-load-error");
  return (
    <div className="space-y-3">
      <TapNavi />
      {(Object.keys(data) as (keyof typeof data)[]).map((itemKey) => {
        if (!data[itemKey]) return;
        if (data[itemKey] && data[itemKey].idArray.length === 0) return;
        if (itemKey === "trendingSongs") {
          return (
            <ListItemUpFaceGroup description={itemKey} key={itemKey}>
              <ListItemUpFaceContainer songs={data[itemKey]} />
            </ListItemUpFaceGroup>
          );
        }
        if (itemKey === "recentlyPlayed") {
          return (
            <RecentlyListContainer
              showMore={true}
              href="/library/recently"
              key={itemKey}
              songs={data[itemKey] as GetRecent}
              description={itemKey}
            />
          );
        }
        return (
          <ListUpFaceGroup
            key={itemKey}
            list={data[itemKey]}
            description={itemKey}
          />
        );
      })}
    </div>
  );
}
export default page;
