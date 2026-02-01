"use client";

import { getUserLibClient } from "@/database/client-data";
import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import type { SongInfo } from "../../../database.types-fest";
import type { NavbarList } from "@/database/data-types-return";
import { NormalizedById } from "@/lib/returnById";

interface songContext {
  song: SongInfo | undefined;
}

interface InfoTrackContextProps extends songContext {
  id?: string;
  source?: "create" | "reference" | "none";
}

export const InfoTrackContext = createContext<InfoTrackContextProps>({
  id: "",
  source: "none",
  song: undefined,
});

function getSourceType(
  userLib: NormalizedById<NavbarList>,
  source: "create" | "reference" | "none" | undefined,
  id: string | undefined,
) {
  if (source) {
    const { source } = userLib.byId[id || ""] ?? { source: "none" };
    return source;
  }
  return source;
}
//source is optional and it is only required when we want to remove songs from library in Page like playlist page
function ContextInfoTrack({
  children,
  id,
  source,
  song,
}: {
  children: React.ReactNode;
  id: string | undefined;
  source?: "create" | "reference" | "none";
  song: SongInfo | undefined;
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
  const sourceType = getSourceType(userLib, source, id);
  const value = { id, song, source: sourceType };
  return (
    <InfoTrackContext.Provider value={value}>
      {children}
    </InfoTrackContext.Provider>
  );
}

export default ContextInfoTrack;
