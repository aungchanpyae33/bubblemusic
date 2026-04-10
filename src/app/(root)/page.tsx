import { get, getUnAuthRoot } from "@/database/data";
import type {
  GetAllMediaItemsReturn,
  GetRecent,
} from "@/database/data-types-return";
import ListUpFaceGroup from "@/ui/ListUpFaceContainer/ListUpFaceGroup";
import ListItemUpFaceGroup from "@/ui/general/ListItemUpFaceGroup/ListItemUpFaceGroup";
import ListItemUpFaceContainer from "@/ui/general/ListItemUpFaceGroup/ListItemUpFaceContainer";
import RecentlyListContainer from "@/ui/ListUpFaceContainer/RecentlyListContainer";
import { userFetch } from "@/lib/UserInfoFetch";
import { getTranslations } from "next-intl/server";
import { outputBaseUrl } from "@/lib/outputBaseUrl";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getTranslations("MetaData");
  return {
    title: meta("default.title"),
    description: meta("default.description"),
    metadataBase: outputBaseUrl(),
    alternates: {
      canonical: "/",
    },
  };
}

async function page() {
  const user = await userFetch();

  const { data, error } = user ? await get() : await getUnAuthRoot();
  if (!data || error) throw new Error("page-load-error");
  return (
    <div className="space-y-3">
      {(Object.keys(data) as (keyof typeof data)[]).map((itemKey) => {
        if (!data[itemKey]) return;
        if (data[itemKey] && data[itemKey].idArray.length === 0) return;
        if (itemKey === "trendingSongs" || itemKey === "trendingSongsWeek") {
          return (
            <ListItemUpFaceGroup description={itemKey} key={itemKey}>
              <ListItemUpFaceContainer songs={data[itemKey]} />
            </ListItemUpFaceGroup>
          );
        }
        if (
          (itemKey as keyof GetAllMediaItemsReturn["data"]) === "recentlyPlayed"
        ) {
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
