"use client";
import ContextContainer from "./ContextContainer";
import ArrowNaviContainer from "./ArrowNaviContainer";
import SonglistsContainer from "../playlist/SonglistsContainer";
import SonglistWrapper from "./SonglistWrapper";
import { useQuery } from "@tanstack/react-query";
import { getRecentClient } from "@/database/client-data";
import type { GetRecent } from "@/database/data-types-return";
function RecentlyListContainer({
  songs,
  description,
}: {
  songs: GetRecent;
  description: string;
}) {
  const { data, error } = useQuery({
    queryKey: ["recentlyPlayed"],
    queryFn: () => getRecentClient(),
    initialData: songs,
  });

  if (!data || error || data.idArray.length === 0) return;
  return (
    <ContextContainer>
      <div aria-label="song name is" className=" justify-between px-4  flex ">
        <h3>{description}</h3>
        <ArrowNaviContainer />
      </div>
      <div className="relative z-0 max-w-fit">
        <SonglistWrapper>
          {data.idArray.map((id, index) => {
            const item = data.byId[`${id}`];
            return (
              <SonglistsContainer
                index={index}
                key={item.id}
                list={item}
                description={description}
              />
            );
          })}
        </SonglistWrapper>
      </div>
    </ContextContainer>
  );
}

export default RecentlyListContainer;
