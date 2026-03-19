"use client";

import { getRecentClient } from "@/database/client-data";
import type { GetRecent } from "@/database/data-types-return";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import ContextContainer from "./ContextContainer";
import ListGeneralHeader from "./ListGeneralHeader";
import ArrowNaviContainer from "../ListUpFaceContainer/ArrowNaviContainer";
import ListUpFaceContainerWrapper from "../ListUpFaceContainer/ListUpFaceContainerWrapper";
import ListUpFaceContainer from "../ListUpFaceContainer/ListUpFaceContainer";

function RecentlyListContainer({
  songs,
  description,
}: {
  songs: GetRecent;
  description: string;
}) {
  const l = useTranslations("ListTitle");
  const { data, error } = useQuery({
    queryKey: ["recentlyPlayed"],
    queryFn: () => getRecentClient(),
    initialData: songs,
  });

  if (!data || error || data.idArray.length === 0) return;
  return (
    <ContextContainer>
      <div className=" justify-between px-4  flex ">
        <ListGeneralHeader>{l(description)}</ListGeneralHeader>
        <ArrowNaviContainer />
      </div>
      <div className="relative z-0 max-w-fit">
        <ListUpFaceContainerWrapper>
          {data.idArray.map((id) => {
            const item = data.byId[id];
            return <ListUpFaceContainer key={item.id} list={item} />;
          })}
        </ListUpFaceContainerWrapper>
      </div>
    </ContextContainer>
  );
}

export default RecentlyListContainer;
