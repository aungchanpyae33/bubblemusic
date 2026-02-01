import { get } from "@/database/data";
import Container from "@/ui/albumContainer/Container";
import RecentlyListContainer from "@/ui/albumContainer/RecentlyListContainer";
import ListItemContainer from "@/ui/general/ListItemContainer/ListItemContainer";
import ListItemScrollHz from "@/ui/general/ListItemContainer/ListItemScrollHz";
import TapNavi from "@/ui/Home/TapNavi";
import type { GetRecent } from "@/database/data-types-return";

async function page() {
  const { data, error } = await get();

  if (!data || error) return null;
  return (
    <div className="space-y-3">
      <TapNavi />
      {(Object.keys(data) as (keyof typeof data)[]).map((itemKey) => {
        if (!data[itemKey]) return;
        if (data[itemKey] && data[itemKey].idArray.length === 0) return;
        if (itemKey === "trendingSongs") {
          return (
            <ListItemScrollHz description={itemKey} key={itemKey}>
              <ListItemContainer songs={data[itemKey]} />
            </ListItemScrollHz>
          );
        }
        if (itemKey === "recentlyPlayed") {
          return (
            <RecentlyListContainer
              key={itemKey}
              songs={data[itemKey] as GetRecent}
              description={itemKey}
            />
          );
        }
        return (
          <Container
            key={itemKey}
            songs={data[itemKey]}
            description={itemKey}
          />
        );
      })}
    </div>
  );
}
export default page;
